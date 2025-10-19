"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdownRenderer } from "@/components/utils/TinaMarkdownRenderer";

interface ValueCardBlockProps {
  data: {
    icon?: string;
    title?: string;
    description?: any;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function ValueCardBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: ValueCardBlockProps) {
  const { icon = "", title = "", description } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.6 }}
      className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="card-body text-center">
        <div
          className="text-4xl mb-4"
          data-tina-field={tinaField(data, "icon")}
        >
          {icon}
        </div>
        <h3
          className="card-title justify-center text-xl mb-3"
          data-tina-field={tinaField(data, "title")}
        >
          {title}
        </h3>
        <div
          className="text-base-content/80 prose prose-sm max-w-none"
          data-tina-field={tinaField(data, "description")}
        >
          <TinaMarkdownRenderer content={description} />
        </div>
      </div>
    </motion.div>
  );
}
