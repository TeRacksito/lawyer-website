"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

interface Pillar {
  letter: string;
  title: string;
  description: string;
}

interface ValuesPresentationProps {
  data: {
    title?: string;
    pillars?: Pillar[];
  };
  dataTinaField?: string;
}

export default function ValuesPresentationBlock({
  data,
  dataTinaField,
}: ValuesPresentationProps) {
  const { title = "Nuestros Pilares", pillars = [] } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-primary/10 rounded-2xl p-8 max-w-3xl mx-auto"
      data-tina-field={dataTinaField}
    >
      <h3
        className="text-2xl font-semibold mb-6 text-center"
        data-tina-field={tinaField(data as any, "title")}
      >
        {title}
      </h3>
      <div
        className="space-y-4"
        data-tina-field={tinaField(data as any, "pillars")}
      >
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-center space-x-4"
            data-tina-field={tinaField(pillar as any, "")}
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {pillar.letter}
            </div>
            <div>
              <h4
                className="font-semibold"
                data-tina-field={tinaField(pillar as any, "title")}
              >
                {pillar.title}
              </h4>
              <p
                className="text-sm text-base-content/70"
                data-tina-field={tinaField(pillar as any, "description")}
              >
                {pillar.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
