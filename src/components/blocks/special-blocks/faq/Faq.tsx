"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import FaqItem from "./FaqItem";

interface FaqItemData {
  faq_item_question?: string;
  faq_item_answer?: any;
}

interface FaqBlockProps {
  data: {
    faq_items?: FaqItemData[];
    faq_enableSearch?: boolean;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

/**
 * FaqBlock component displays a list of frequently asked questions with collapsible answers.
 * Supports search functionality to filter questions and answers.
 * Each FAQ item can be independently expanded or collapsed.
 * Supports URL hash navigation (#faq-item-0, #faq-item-1, etc).
 */
export default function FaqBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: FaqBlockProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHash, setActiveHash] = useState("");
  const { faq_items = [], faq_enableSearch = true } = data;

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash.slice(1));
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return faq_items;

    const query = searchQuery.toLowerCase();
    return faq_items.filter(
      (item) =>
        item.faq_item_question?.toLowerCase().includes(query) ||
        JSON.stringify(item.faq_item_answer).toLowerCase().includes(query)
    );
  }, [searchQuery, faq_items]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      {faq_enableSearch && faq_items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: motionDelay + 0.25, duration: 0.6 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Busca una pregunta, palabra clave, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/50"
            aria-label="Buscar preguntas frecuentes"
          />
        </motion.div>
      )}

      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const itemId = `faq-item-${faq_items.indexOf(item)}`;
            return (
              <motion.div
                key={itemId}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: motionDelay + 0.3 + index * 0.1,
                  duration: 0.5,
                }}
              >
                <FaqItem
                  data={item}
                  dataTinaField={tinaField(item as any, "")}
                  itemId={itemId}
                  shouldBeOpen={activeHash === itemId}
                />
              </motion.div>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: motionDelay + 0.3, duration: 0.6 }}
            className="text-center text-base-content/60 py-8"
          >
            <p>No se encontraron resultados para "{searchQuery}"</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
