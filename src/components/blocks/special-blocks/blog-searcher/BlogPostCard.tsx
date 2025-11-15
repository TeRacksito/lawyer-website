"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

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

interface BlogPostCardProps {
  title: string;
  url: string;
  excerpt?: string;
  date?: string;
  category?: string;
  readTime?: string;
  tags?: Tag[];
  featuredImage?: FeaturedImage;
  author?: Author;
  motionDelay?: number;
  index?: number;
}

/**
 * BlogPostCard component displays an individual blog post with professional styling.
 * Features excerpt, metadata, and smooth animations.
 */
export default function BlogPostCard({
  title,
  url,
  excerpt,
  date,
  category,
  readTime,
  tags,
  featuredImage,
  author,
  motionDelay = 0,
  index = 0,
}: BlogPostCardProps) {
  const metadata: Array<{ label: string; value?: string; icon?: ReactNode }> =
    [];



  if (date) {
    metadata.push({
      label: date,
      icon: <CalendarIcon />,
    });
  }

  if (readTime) {
    metadata.push({
      label: readTime,
      icon: <ClockIcon />,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: motionDelay + 0.3 + index * 0.05,
        duration: 0.5,
      }}
      className="h-full"
    >
      <Link
        href={url}
        className="group h-full block"
        aria-label={`Leer artículo: ${title}`}
      >
        <article className="card card-border h-full bg-base-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
          {featuredImage ? (
            <figure className="relative w-full h-48 overflow-hidden">
              <img
                src={featuredImage.src}
                alt={featuredImage.alt || title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </figure>
          ) : (
            <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-5"></div>
              {author?.image ? (
                <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20 bg-base-200">
                  <img
                    src={author.image}
                    alt={author.name || "Author"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative z-10 text-6xl opacity-20">📄</div>
              )}
            </div>
          )}

          <div className="card-body flex flex-col flex-1">
            <h3
              className="card-title text-lg md:text-xl text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2"
              title={title}
            >
              {title}
            </h3>
            <p className="sr-only">{title}</p>

            {excerpt && (
              <>
                <p
                  className="text-base-content/70 text-sm md:text-base line-clamp-3 leading-relaxed flex-1"
                  title={excerpt}
                >
                  {excerpt}
                </p>
                <p className="sr-only">{excerpt}</p>
              </>
            )}

            {author && (author.name || author.title) && (
              <div
                className="flex items-center gap-2 pt-3 text-sm text-base-content/60"
                role="contentinfo"
              >
                {author.image && (
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-base-200 flex-shrink-0">
                    <img
                      src={author.image}
                      alt={author.name || "Author"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  {author.name && (
                    <span className="font-medium text-base-content">
                      {author.name}
                    </span>
                  )}
                  {author.title && (
                    <span className="text-xs">{author.title}</span>
                  )}
                </div>
              </div>
            )}

            {metadata.length > 0 && (
              <div
                className="flex flex-wrap gap-4 pt-4 mt-auto text-xs md:text-sm text-base-content/60"
                role="doc-credit"
              >
                {metadata.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {item.icon && (
                      <span
                        className="opacity-75 flex-shrink-0"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {tags && tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2 pt-3"
                role="list"
                aria-label="Etiquetas del artículo"
              >
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    role="listitem"
                    className={`badge badge-sm ${
                      tag.color ? `badge-${tag.color}` : "badge-primary"
                    } badge-outline`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            <div className="card-actions pt-4 mt-auto">
              <div className="badge badge-outline badge-sm md:badge-md group-hover:bg-primary group-hover:border-primary group-hover:text-primary-content transition-all duration-300">
                Leer más
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}
