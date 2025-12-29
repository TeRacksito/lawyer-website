"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import OpenableImg from "@/components/ui/img/OpenableImg";

interface ImageBlockProps {
  data: {
    image_src?: string;
    image_alt?: string;
    image_footer?: any;
    image_author?: any;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function ImageBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: ImageBlockProps) {
  const { image_src, image_alt, image_footer, image_author } = data;

  if (!image_src) {
    return null;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: motionDelay },
    },
  };

  return (
    <motion.figure
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      role="img"
      aria-label={image_alt || "Imagen"}
      className="max-w-4xl mx-auto my-6"
    >
      <OpenableImg
        src={image_src}
        alt={image_alt || ""}
        footer={image_footer}
        author={image_author}
        dataTinaField={tinaField(data as any, "image_src")}
        dataTinaFieldFooter={tinaField(data as any, "image_footer")}
        dataTinaFieldAuthor={tinaField(data as any, "image_author")}
      />
    </motion.figure>
  );
}
