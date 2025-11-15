"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import BlogPostCard from "./BlogPostCard";

interface Tag {
  name: string;
  color?: string;
}

interface Author {
  name?: string;
  title?: string;
  image?: string;
}

interface FeaturedImage {
  src: string;
  alt?: string;
}

interface PostMeta {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  date?: string;
  category?: string;
  readTime?: string;
  tags?: Tag[];
  featuredImage?: FeaturedImage;
  author?: Author;
}

interface BlogSearcherProps {
  data: {
    placeholder?: string;
    noResultsText?: string;
    showResultCount?: boolean;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

/**
 * BlogSearcher component provides a search interface for blog posts.
 * Uses Fuse.js for fuzzy search with pre-generated compressed JSON search index.
 */
async function decompressGzip(buffer: ArrayBuffer): Promise<string> {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array(buffer));
      controller.close();
    },
  });

  const decompressed = stream.pipeThrough(
    new DecompressionStream("gzip") as any
  );
  const response = new Response(decompressed);
  const blob = await response.blob();
  return blob.text();
}

function removeDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function BlogSearcher({
  data,
  dataTinaField,
  motionDelay = 0,
}: BlogSearcherProps) {
  const {
    placeholder = "Buscar en el blog...",
    noResultsText = "No se encontraron resultados",
    showResultCount = true,
  } = data;

  const [searchQuery, setSearchQuery] = useState("");
  const [fuse, setFuse] = useState<Fuse<PostMeta> | null>(null);
  const [postsMeta, setPostsMeta] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initSearch() {
      try {
        const [metaRes, indexRes] = await Promise.all([
          fetch("/posts-meta.json.gz"),
          fetch("/search-index.json.gz"),
        ]);

        if (!metaRes.ok || !indexRes.ok) {
          throw new Error("Failed to load search index files");
        }

        const [metaBuffer, indexBuffer] = await Promise.all([
          metaRes.arrayBuffer(),
          indexRes.arrayBuffer(),
        ]);

        const [metaJson, indexJson] = await Promise.all([
          decompressGzip(metaBuffer),
          decompressGzip(indexBuffer),
        ]);

        const meta = JSON.parse(metaJson) as PostMeta[];
        const indexData = JSON.parse(indexJson) as {
          keys: Array<{ name: string; weight: number }>;
          index: { keys: readonly string[]; records: any };
        };

        const fuseIndex = Fuse.parseIndex(indexData.index);

        console.log(`Fuse index loaded from compressed JSON`, {
          docs: meta.length,
          keys: indexData.keys.length,
        });

        const fuseInstance = new Fuse<PostMeta>(
          meta,
          {
            keys: indexData.keys,
            includeScore: true,
            includeMatches: true,
            useExtendedSearch: true,
            ignoreLocation: true,
            threshold: 0.1,
          },
          fuseIndex
        );

        setFuse(fuseInstance);
        setPostsMeta(meta);
        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing search:", err);
        setError("Error al cargar el buscador");
        setIsLoading(false);
      }
    }

    initSearch();
  }, []);

  const searchResults = useMemo(() => {
    if (!fuse || !searchQuery.trim()) {
      return postsMeta;
    }

    const normalizedQuery = removeDiacritics(searchQuery);
    const results = fuse.search(normalizedQuery);
    return results.map((result) => result.item);
  }, [fuse, searchQuery, postsMeta]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-8"
      data-tina-field={dataTinaField}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: motionDelay + 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <label htmlFor="blog-search" className="sr-only">
          Buscar posts del blog
        </label>
        <input
          id="blog-search"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
          className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/50"
          aria-label="Buscar posts del blog"
          aria-describedby={
            searchQuery.trim() ? "search-results-count" : undefined
          }
          aria-busy={isLoading}
        />
        {showResultCount && !isLoading && searchQuery.trim() && (
          <p
            id="search-results-count"
            className="text-sm text-base-content/60 mt-2"
            role="status"
            aria-live="polite"
          >
            {searchResults.length}{" "}
            {searchResults.length === 1
              ? "resultado encontrado"
              : "resultados encontrados"}{" "}
          </p>
        )}
      </motion.div>

      {isLoading ? (
        <div
          className="flex justify-center py-8"
          role="status"
          aria-live="polite"
        >
          <span
            className="loading loading-spinner loading-lg"
            aria-label="Cargando artículos del blog"
          ></span>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Resultados de búsqueda de artículos"
        >
          {searchResults.length > 0 ? (
            searchResults.map((post, index) => (
              <div key={post.id} role="listitem">
                <BlogPostCard
                  title={post.title}
                  url={post.url}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category}
                  readTime={post.readTime}
                  tags={post.tags}
                  featuredImage={post.featuredImage}
                  author={post.author}
                  motionDelay={motionDelay}
                  index={index}
                />
              </div>
            ))
          ) : searchQuery.trim() ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: motionDelay + 0.3, duration: 0.6 }}
              className="col-span-full text-center text-base-content/60 py-8"
              role="status"
              aria-live="polite"
            >
              <p>{noResultsText}</p>
            </motion.div>
          ) : null}
        </div>
      )}
    </motion.section>
  );
}
