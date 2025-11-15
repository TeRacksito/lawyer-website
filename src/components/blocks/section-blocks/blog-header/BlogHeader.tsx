"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import OpenableImg from "@/components/ui/img/OpenableImg";
import { TinaMarkdownRenderer } from "@/components/utils/TinaMarkdownRenderer";
import { useMemo } from "react";

interface Tag {
  blog_header_tag_name?: string;
  blog_header_tag_color?: string;
}

interface Author {
  blog_header_author_name?: string;
  blog_header_author_title?: string;
  blog_header_author_image?: string;
}

interface FeaturedImage {
  blog_header_featured_image_src?: string;
  blog_header_featured_image_alt?: string;
  blog_header_featured_image_footer?: any;
  blog_header_featured_image_author?: any;
}

interface BlogHeaderBlockProps {
  data: {
    blog_header_title?: string;
    blog_header_subtitle?: any;
    blog_header_author?: Author;
    blog_header_publish_date?: string;
    blog_header_read_time?: number;
    blog_header_tags?: Tag[];
    blog_header_featured_image?: FeaturedImage;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function BlogHeaderBlock({
  data,
  motionDelay = 0,
}: BlogHeaderBlockProps) {
  const {
    blog_header_title: title,
    blog_header_subtitle: subtitle,
    blog_header_author: author,
    blog_header_publish_date: publish_date,
    blog_header_read_time: read_time,
    blog_header_tags: tags = [],
    blog_header_featured_image: featuredImageData,
  } = data;

  const featured_image = featuredImageData?.blog_header_featured_image_src;
  const featured_image_alt =
    featuredImageData?.blog_header_featured_image_alt || "Featured image";
  const featured_image_footer =
    featuredImageData?.blog_header_featured_image_footer;
  const featured_image_author =
    featuredImageData?.blog_header_featured_image_author;

  const formattedDate =
    publish_date && publish_date !== "today"
      ? new Date(publish_date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const dateInfo = useMemo(() => {
    if (!publish_date || publish_date === "today") return null;

    const publishDate = new Date(publish_date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    let relativeTime = "";
    if (diffDays === 0) {
      relativeTime = "Hoy";
    } else if (diffDays === 1) {
      relativeTime = "Hace 1 día";
    } else if (diffDays < 7) {
      relativeTime = `Hace ${diffDays} días`;
    } else if (diffWeeks === 1) {
      relativeTime = "Hace 1 semana";
    } else if (diffWeeks < 4) {
      relativeTime = `Hace ${diffWeeks} semanas`;
    } else if (diffMonths === 1) {
      relativeTime = "Hace 1 mes";
    } else if (diffMonths < 12) {
      relativeTime = `Hace ${diffMonths} meses`;
    } else {
      relativeTime = `Hace ${Math.floor(diffMonths / 12)} años`;
    }

    return {
      isoDate: publishDate.toISOString(),
      relativeTime,
    };
  }, [publish_date]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: motionDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const showMetadata =
    author?.blog_header_author_name || formattedDate || read_time;

  return (
    <motion.section
      className="px-4 py-3 sm:px-6 md:px-8 my-3 sm:my-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-label="Encabezado del artículo del blog"
      role="region"
    >
      <article className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {/* Main Title */}
        {title && (
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight"
            data-tina-field={tinaField(data as any, "blog_header_title")}
          >
            {title}
          </motion.h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            variants={itemVariants}
            className="text-base sm:text-lg text-base-content/70"
            data-tina-field={tinaField(data as any, "blog_header_subtitle")}
          >
            <TinaMarkdownRenderer content={subtitle} />
          </motion.div>
        )}

        {/* Author Info & Metadata */}
        {showMetadata && (
          <motion.div
            data-theme="dark"
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-lg"
            role="region"
            aria-label="Metadatos del artículo"
          >
            {/* Author Section */}
            {author?.blog_header_author_name ||
            author?.blog_header_author_image ? (
              <div
                className="flex items-center gap-2 sm:gap-3"
                role="img"
                aria-label={`Autor: ${
                  author?.blog_header_author_name || "Autor desconocido"
                }`}
              >
                {author?.blog_header_author_image && (
                  <figure
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 bg-base-200"
                    data-tina-field={tinaField(
                      data as any,
                      "blog_header_author.blog_header_author_image"
                    )}
                  >
                    <Image
                      src={author.blog_header_author_image}
                      alt={`Avatar de ${
                        author.blog_header_author_name || "Autor"
                      }`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                )}
                <div>
                  {author?.blog_header_author_name && (
                    <p
                      className="text-sm sm:text-base font-semibold text-base-content"
                      data-tina-field={tinaField(
                        data as any,
                        "blog_header_author.blog_header_author_name"
                      )}
                    >
                      {author.blog_header_author_name}
                    </p>
                  )}
                  {author?.blog_header_author_title && (
                    <p
                      className="text-xs sm:text-sm text-base-content/60"
                      data-tina-field={tinaField(
                        data as any,
                        "blog_header_author.blog_header_author_title"
                      )}
                    >
                      {author.blog_header_author_title}
                    </p>
                  )}
                </div>
              </div>
            ) : null}

            {/* Metadata (Date & Read Time) */}
            <div
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-base-content/60"
              role="group"
              aria-label="Metadatos del artículo"
            >
              {formattedDate && dateInfo && (
                <time
                  className="flex items-center gap-1 cursor-help"
                  dateTime={dateInfo.isoDate}
                  title={dateInfo.relativeTime}
                  aria-label={`Publicado el ${formattedDate}, ${dateInfo.relativeTime}`}
                  data-tina-field={tinaField(
                    data as any,
                    "blog_header_publish_date"
                  )}
                >
                  <Calendar
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap">{formattedDate}</span>
                </time>
              )}
              {read_time && (
                <>
                  {formattedDate && <span aria-hidden="true">•</span>}
                  <span
                    className="flex items-center gap-1 cursor-help"
                    data-tina-field={tinaField(
                      data as any,
                      "blog_header_read_time"
                    )}
                    title={`Tiempo estimado de lectura: ${read_time} minutos`}
                    aria-label={`Tiempo de lectura: ${read_time} minutos`}
                  >
                    <Clock
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap">
                      {read_time} min de lectura
                    </span>
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-1.5 sm:gap-2"
            role="region"
            aria-label="Etiquetas del artículo"
          >
            <div className="sr-only">Etiquetas:</div>
            {tags.map((tag: Tag, index: number) => (
              <span
                key={index}
                className={`badge badge-sm sm:badge-md badge-outline ${
                  tag.blog_header_tag_color
                    ? `badge-${tag.blog_header_tag_color}`
                    : "badge-primary"
                }`}
                data-tina-field={tinaField(tag as any, "")}
                role="button"
                tabIndex={0}
                aria-label={`Etiqueta: ${tag.blog_header_tag_name}`}
              >
                {tag.blog_header_tag_name}
              </span>
            ))}
          </motion.div>
        )}

        {/* Featured Image */}
        {featured_image && (
          <motion.figure
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
            role="img"
            aria-label={`Imagen destacada: ${featured_image_alt}`}
          >
            <OpenableImg
              src={featured_image}
              alt={featured_image_alt}
              footer={featured_image_footer}
              author={featured_image_author}
              dataTinaField={tinaField(
                data as any,
                "blog_header_featured_image.blog_header_featured_image_src"
              )}
              dataTinaFieldFooter={tinaField(
                data as any,
                "blog_header_featured_image.blog_header_featured_image_footer"
              )}
              dataTinaFieldAuthor={tinaField(
                data as any,
                "blog_header_featured_image.blog_header_featured_image_author"
              )}
            />
          </motion.figure>
        )}
      </article>
    </motion.section>
  );
}
