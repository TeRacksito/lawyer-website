"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdownRenderer } from "@/components/utils/TinaMarkdownRenderer";

interface TimelineItem {
  year: string;
  title: string;
  description: any;
  highlight?: boolean;
}

interface TimelineBlockProps {
  data: {
    title?: string;
    items?: TimelineItem[];
  };
  dataTinaField?: string;
}

export default function TimelineBlock({
  data,
  dataTinaField,
}: TimelineBlockProps) {
  const { title = "Hitos de Nuestro Camino", items = [] } = data;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <article>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl font-semibold text-center mb-12"
          data-tina-field={tinaField(data as any, "title")}
        >
          {title}
        </motion.h3>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 w-1 bg-primary h-full"></div>

          <div>
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative mb-12 md:flex md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                data-tina-field={tinaField(item as any, "")}
              >
                <div
                  className={`
                    pl-12 md:pl-0 
                    md:w-1/2 
                    ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}
                  `}
                >
                  <div
                    className={`card bg-base-200 shadow-lg ${
                      item.highlight ? "border-2 border-primary" : ""
                    }`}
                  >
                    <div className="card-body">
                      <div
                        className="badge badge-primary mb-2"
                        data-tina-field={tinaField(item as any, "year")}
                      >
                        {item.year}
                      </div>
                      <h4
                        className="card-title text-lg"
                        data-tina-field={tinaField(item as any, "title")}
                      >
                        {item.title}
                      </h4>
                      <div
                        data-tina-field={tinaField(item as any, "description")}
                      >
                        <TinaMarkdownRenderer
                          content={item.description}
                          className="text-base-content/80"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`
                    absolute left-2.5 top-6 md:top-1/2 md:left-1/2 
                    md:transform md:-translate-x-1/2 md:-translate-y-1/2
                    w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary
                    border-2 md:border-4 border-base-100
                  `}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
