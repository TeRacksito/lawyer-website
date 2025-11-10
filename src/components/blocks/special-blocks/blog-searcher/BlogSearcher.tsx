"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Fuse from "fuse.js";

interface PostMeta {
  id: string;
  title: string;
  url: string;
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

    const results = fuse.search(searchQuery);
    console.log(`Search results for "${searchQuery}":`, results);
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
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
          className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/50"
          aria-label="Buscar posts del blog"
        />
        {showResultCount && !isLoading && searchQuery.trim() && (
          <p className="text-sm text-base-content/60 mt-2">
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "resultado" : "resultados"}{" "}
            encontrados
          </p>
        )}
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: motionDelay + 0.3 + index * 0.05,
                  duration: 0.5,
                }}
              >
                <Link
                  href={post.url}
                  className="card card-border hover:shadow-lg transition-shadow duration-300 block"
                >
                  <div className="card-body">
                    <h3 className="card-title text-primary">{post.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : searchQuery.trim() ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: motionDelay + 0.3, duration: 0.6 }}
              className="text-center text-base-content/60 py-8"
            >
              <p>{noResultsText}</p>
            </motion.div>
          ) : null}
        </div>
      )}
    </motion.section>
  );
}
