import fs from "fs-extra";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import Fuse from "fuse.js";
import zlib from "zlib";
import { promisify } from "util";

const BLOG_GLOB = "content/pages/blog/*/**/page.mdx";
const OUTPUT_INDEX_COMPRESSED = "public/search-index.json.gz";
const OUTPUT_META_COMPRESSED = "public/posts-meta.json.gz";

const gzip = promisify(zlib.gzip);

/* --- Config: tune these --- */
const COMPONENT_TEXT_WEIGHT_TITLE = 0.35;
const COMPONENT_TEXT_WEIGHT_REMAINDER = 0.65;
const MAX_COMPONENTS_TO_KEEP = 200; // safety cap
const MIN_TEXT_LENGTH = 3; // ignore tiny tokens
const CHUNK_SIZE = 800; // not used here: we produce per-component keys

/* --- Heuristics for what counts as textual field names --- */
const TEXT_KEY_PATTERNS = [
  "title",
  "subtitle",
  "heading",
  "text",
  "description",
  "content",
  "summary",
  "excerpt",
  "caption",
  "name",
  "value",
  "label",
  "meta",
  "specialty",
  "specialties",
  "focus",
  "card",
];

function isTextualKey(key) {
  const lowerKey = key.toLowerCase();

  if (
    NON_TEXT_KEYS.some((nonTextKey) =>
      lowerKey.includes(nonTextKey.toLowerCase())
    )
  ) {
    return false;
  }

  return TEXT_KEY_PATTERNS.some((pattern) => lowerKey.includes(pattern));
}

function isNonTextKey(key) {
  const lowerKey = key.toLowerCase();
  return NON_TEXT_KEYS.some(
    (nonTextKey) => lowerKey === nonTextKey.toLowerCase()
  );
}

/* --- Keys that are explicitly non-textual or likely to be CSS/classes --- */
const NON_TEXT_VALUE_PATTERNS = [
  /^\s*$/, // empty
  /^\/?assets?\//i, // image paths
  /\.(jpg|jpeg|png|webp|svg|gif|mp4)$/i, // files
  /^[\w-]{1,30}$/, // short single-word tokens (likely classes)
  /^[!@#$%^&*(),.?":{}|<>]+$/, // only punctuation
  /^(text|items|justify|flex|grid|gap|p|m|w|h|max|min|prose|bg|border|rounded|shadow|opacity|z)-/i, // Tailwind prefixes
  /^(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|full|auto|screen|center|left|right|top|bottom|start|end)$/i, // Tailwind size/position values
  /^(h[1-6]|div|span|p|section|article|header|footer|nav|aside|main)$/i, // HTML tags
  /^(parent|child|true|false|null|undefined)$/i, // Common non-text values
];

const NON_TEXT_KEYS = [
  "textAlign",
  "verticalAlign",
  "horizontalAlign",
  "proseSize",
  "level",
  "size",
  "variant",
  "theme",
  "template",
  "_template",
  "align",
  "justify",
  "direction",
  "position",
  "display",
  "className",
  "class",
  "style",
  "width",
  "height",
  "padding",
  "margin",
  "color",
  "background",
  "border",
  "fullScreen",
  "yShift",
  "xShift",
];

/* --- helpers --- */

function removeDiacritics(s = "") {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function looksLikeNonTextValue(v) {
  if (typeof v !== "string") return false;
  const s = v.trim();
  if (s.length < MIN_TEXT_LENGTH) return true;

  for (const re of NON_TEXT_VALUE_PATTERNS) {
    if (re.test(s)) return true;
  }

  return false;
}

function cleanString(s = "") {
  return removeDiacritics(
    String(s)
      .replace(/<\/?[^>]+(>|$)/g, "") // strip HTML
      .replace(/[#_*`>~\-]{1,}/g, " ") // strip markdown-ish markers
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Recursively extract textual values from an object, but only if the key names
 * or values suggest human text (per TEXT_KEY_PATTERNS and value heuristics).
 *
 * Returns an array of { keyPath, text } where keyPath is e.g. "blocks[0].basic_section.title"
 */
function extractTextEntries(obj, basePath = "") {
  const out = [];

  if (obj == null) return out;
  if (typeof obj === "string") {
    const cleaned = cleanString(obj);
    if (!looksLikeNonTextValue(cleaned))
      out.push({ keyPath: basePath || "value", text: cleaned });
    return out;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const sub = extractTextEntries(obj[i], `${basePath}[${i}]`);
      out.push(...sub);
    }
    return out;
  }

  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const path = basePath ? `${basePath}.${k}` : k;

      if (isNonTextKey(k)) {
        continue;
      }

      if (typeof v === "string" && isTextualKey(k)) {
        const cleaned = cleanString(v);
        if (!looksLikeNonTextValue(cleaned))
          out.push({ keyPath: path, text: cleaned });
        continue;
      }

      if (typeof v === "string") {
        const cleaned = cleanString(v);
        if (!looksLikeNonTextValue(cleaned) && cleaned.length >= 30) {
          out.push({ keyPath: path, text: cleaned });
          continue;
        }
      }

      const rec = extractTextEntries(v, path);
      out.push(...rec);
    }
  }

  return out;
}

function pathToSlug(filepath) {
  const folder = path.dirname(filepath);
  const rel = path.relative("content/pages", folder);
  return "/" + rel.replace(/\\/g, "/");
}

/**
 * Extract blog-specific metadata from the blog_header block
 */
function extractBlogMetadata(blocks) {
  const metadata = {};

  if (!blocks || !Array.isArray(blocks)) return metadata;

  const blogHeader = blocks.find((block) => block._template === "blog_header");

  if (!blogHeader) return metadata;

  if (blogHeader.blog_header_title) {
    metadata.headerTitle = cleanString(blogHeader.blog_header_title);
  }

  if (blogHeader.blog_header_subtitle) {
    metadata.headerSubtitle = cleanString(blogHeader.blog_header_subtitle);
  }

  // Extract author information
  if (blogHeader.blog_header_author) {
    const author = blogHeader.blog_header_author;
    if (
      author.blog_header_author_name ||
      author.blog_header_author_title ||
      author.blog_header_author_image
    ) {
      metadata.author = {
        name: author.blog_header_author_name,
        title: author.blog_header_author_title,
        image: author.blog_header_author_image,
      };
    }
  }

  // Extract publish date
  if (blogHeader.blog_header_publish_date) {
    try {
      const date = new Date(blogHeader.blog_header_publish_date);
      metadata.date = date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      // Invalid date, skip
    }
  }

  // Extract read time
  if (blogHeader.blog_header_read_time) {
    metadata.readTime = `${blogHeader.blog_header_read_time} min`;
  }

  // Extract tags
  if (
    blogHeader.blog_header_tags &&
    Array.isArray(blogHeader.blog_header_tags)
  ) {
    const tags = blogHeader.blog_header_tags
      .filter((tag) => tag.blog_header_tag_name)
      .map((tag) => ({
        name: tag.blog_header_tag_name,
        color: tag.blog_header_tag_color || "primary",
      }));
    if (tags.length > 0) {
      metadata.tags = tags;
    }
  }

  // Extract featured image
  if (blogHeader.blog_header_featured_image) {
    const img = blogHeader.blog_header_featured_image;
    if (img.blog_header_featured_image_src) {
      metadata.featuredImage = {
        src: img.blog_header_featured_image_src,
        alt: img.blog_header_featured_image_alt || "",
      };
    }
  }

  return metadata;
}

function buildComponentKeyedDoc(frontmatter, mdxBody, filepath) {
  const blocks = frontmatter.blocks || [];
  const title = frontmatter.title || "";
  const slug = pathToSlug(filepath);

  const doc = {
    id: slug,
    title,
    url: slug,
  };

  // Extract SEO metadata
  if (frontmatter.seo) {
    if (frontmatter.seo.metaTitle)
      doc["metaTitle"] = cleanString(frontmatter.seo.metaTitle);
    if (frontmatter.seo.metaDescription)
      doc["metaDescription"] = cleanString(frontmatter.seo.metaDescription);
  }

  // Extract blog-specific metadata (author, date, tags, featured image, etc.)
  const blogMetadata = extractBlogMetadata(blocks);
  if (Object.keys(blogMetadata).length > 0) {
    Object.assign(doc, blogMetadata);
  }

  const bodyText = cleanString(mdxBody || "");
  if (bodyText && bodyText.length > 40) {
    doc["mdx_body"] = bodyText;
  }

  let compIndex = 0;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const template =
      (block && (block._template || block.variant || block.template)) ||
      "block";

    const entries = extractTextEntries(block, `blocks[${i}]`);
    const texts = entries.map((e) => e.text).filter(Boolean);
    const joined = texts.join(" ").replace(/\s+/g, " ").trim();

    if (joined && joined.length > 20) {
      const keyName = `component_${template}_${compIndex}`;
      doc[keyName] = joined;
      compIndex++;
      if (compIndex >= MAX_COMPONENTS_TO_KEEP) break;
    }
  }

  if (compIndex === 0 && bodyText) {
    const paragraphs = bodyText
      .split(/\n{2,}|\r\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    for (let j = 0; j < Math.min(paragraphs.length, 5); j++) {
      doc[`paragraph_${j}`] = paragraphs[j];
    }
  }

  return doc;
}

async function build() {
  const files = await glob(BLOG_GLOB, { dot: true });
  const docs = [];
  const meta = [];

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);

    if (data.draft) continue;

    const doc = buildComponentKeyedDoc(data, content, file);
    docs.push(doc);

    // Build meta object with all relevant display information
    const metaItem = {
      id: doc.id,
      title: doc.headerTitle || doc.metaTitle || doc.title || doc.id,
      url: doc.url,
    };

    // Add description/excerpt if available
    if (doc.metaDescription) {
      metaItem.excerpt = doc.headerSubtitle || doc.metaDescription;
    }

    // Add blog-specific metadata
    if (doc.date) metaItem.date = doc.date;
    if (doc.readTime) metaItem.readTime = doc.readTime;
    if (doc.author) metaItem.author = doc.author;
    if (doc.tags) metaItem.tags = doc.tags;
    if (doc.featuredImage) metaItem.featuredImage = doc.featuredImage;

    meta.push(metaItem);
  }

  if (!docs.length) {
    console.warn("No docs indexed — check glob or draft flags.");
    return;
  }

  const allKeyNames = new Set();
  for (const d of docs) {
    Object.keys(d).forEach((k) => {
      if (k !== "id" && k !== "url") {
        allKeyNames.add(k);
      }
    });
  }

  const keyNames = Array.from(allKeyNames).filter((k) => k !== "title");
  const keys = [{ name: "title", weight: COMPONENT_TEXT_WEIGHT_TITLE }];
  const remainder = COMPONENT_TEXT_WEIGHT_REMAINDER;
  const perKey = keyNames.length ? remainder / keyNames.length : remainder;

  for (const k of keyNames) {
    keys.push({ name: k, weight: perKey });
  }

  console.log(
    `Building index with ${docs.length} docs and ${keys.length} keys.`
  );

  const fuseIndex = Fuse.createIndex(keys, docs);

  await fs.ensureDir(path.dirname(OUTPUT_INDEX_COMPRESSED));

  const indexData = { keys, index: fuseIndex.toJSON() };
  const indexJson = JSON.stringify(indexData);
  const metaJson = JSON.stringify(meta, null, 2);

  const [indexCompressed, metaCompressed] = await Promise.all([
    gzip(indexJson),
    gzip(metaJson),
  ]);

  await Promise.all([
    fs.writeFile(OUTPUT_INDEX_COMPRESSED, indexCompressed),
    fs.writeFile(OUTPUT_META_COMPRESSED, metaCompressed),
  ]);

  const indexSize = Buffer.byteLength(indexJson);
  const indexCompressedSize = indexCompressed.length;
  const metaSize = Buffer.byteLength(metaJson);
  const metaCompressedSize = metaCompressed.length;

  const indexRatio = ((1 - indexCompressedSize / indexSize) * 100).toFixed(1);
  const metaRatio = ((1 - metaCompressedSize / metaSize) * 100).toFixed(1);

  console.log(`✅ Wrote ${OUTPUT_INDEX_COMPRESSED}`);
  console.log(`✅ Wrote ${OUTPUT_META_COMPRESSED}`);
  console.log(`📊 Compression stats (JSON + gzip):`);
  console.log(
    `   Index: ${indexSize} → ${indexCompressedSize} bytes (${indexRatio}% reduction)`
  );
  console.log(
    `   Meta: ${metaSize} → ${metaCompressedSize} bytes (${metaRatio}% reduction)`
  );
  console.log(`Indexed pages: ${meta.length}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
