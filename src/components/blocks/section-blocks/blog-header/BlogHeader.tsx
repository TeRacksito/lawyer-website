"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import OpenableImg from "@/components/ui/img/OpenableImg";

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
  blog_header_featured_image_footer?: string;
  blog_header_featured_image_author?: string;
}

interface BlogHeaderBlockProps {
  data: {
    blog_header_title?: string;
    blog_header_subtitle?: string;
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

  const formattedDate = publish_date
    ? new Date(publish_date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

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

  return (
    <motion.section
      className="px-6 py-3 my-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <article className="max-w-4xl mx-auto space-y-4">
        {/* Main Title */}
        {title && (
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-base-content leading-tight"
            data-tina-field={tinaField(data as any, "blog_header_title")}
          >
            {title}
          </motion.h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-lg text-base-content/70"
            data-tina-field={tinaField(data as any, "blog_header_subtitle")}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Author Info & Metadata */}
        <motion.div
          data-theme="dark"
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-lg"
        >
          {/* Author Section */}
          {author?.blog_header_author_name ||
          author?.blog_header_author_image ? (
            <div className="flex items-center gap-3">
              {author?.blog_header_author_image && (
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-base-200"
                  data-tina-field={tinaField(
                    data as any,
                    "blog_header_author.blog_header_author_image"
                  )}
                >
                  <Image
                    src={author.blog_header_author_image}
                    alt={author.blog_header_author_name || "Author"}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                {author?.blog_header_author_name && (
                  <p
                    className="font-semibold text-base-content"
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
                    className="text-sm text-base-content/60"
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
          <div className="flex items-center gap-3 text-sm text-base-content/60">
            {formattedDate && (
              <span
                className="flex items-center gap-1"
                data-tina-field={tinaField(
                  data as any,
                  "blog_header_publish_date"
                )}
              >
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
            )}
            {read_time && (
              <>
                <span>•</span>
                <span
                  className="flex items-center gap-1"
                  data-tina-field={tinaField(
                    data as any,
                    "blog_header_read_time"
                  )}
                >
                  <Clock className="w-4 h-4" />
                  {read_time} min de lectura
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {tags.map((tag: Tag, index: number) => (
              <span
                key={index}
                className={`badge badge-outline ${
                  tag.blog_header_tag_color
                    ? `badge-${tag.blog_header_tag_color}`
                    : "badge-primary"
                }`}
                data-tina-field={tinaField(tag as any, "")}
              >
                {tag.blog_header_tag_name}
              </span>
            ))}
          </motion.div>
        )}

        {/* Featured Image */}
        {featured_image && (
          <motion.div
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
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
          </motion.div>
        )}
      </article>
    </motion.section>
  );
}
