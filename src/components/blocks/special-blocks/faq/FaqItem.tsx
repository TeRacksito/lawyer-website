"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdownRenderer } from "@/components/utils/TinaMarkdownRenderer";
import { FaLink } from "react-icons/fa";

interface FaqItemProps {
  data: {
    faq_item_question?: string;
    faq_item_answer?: any;
  };
  dataTinaField?: string;
  itemId: string;
  shouldBeOpen?: boolean;
}

/**
 * FaqItem component displays a single FAQ question with a collapsible answer.
 * Uses regular click handlers for full control over expand/collapse behavior.
 * Supports URL hash navigation with smooth scrolling to open specific questions.
 */
export default function FaqItem({
  data,
  dataTinaField,
  itemId,
  shouldBeOpen = false,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(shouldBeOpen);
  const [isHovered, setIsHovered] = useState(false);
  const { faq_item_question = "", faq_item_answer = "" } = data;

  useEffect(() => {
    setIsOpen(shouldBeOpen);
  }, [shouldBeOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
    const url = new URL(window.location.href);
    url.hash = itemId;
    window.history.pushState(null, "", url.toString());

    setTimeout(() => {
      const element = document.getElementById(itemId);
      if (element) {
        const headerOffset = 100;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  return (
    <div className="bg-base-200 rounded-lg" id={itemId}>
      <button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full px-6 py-4 text-left flex items-center justify-start gap-2 hover:bg-base-300 transition-colors cursor-pointer"
        aria-label={`Toggle answer for: ${faq_item_question}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-base-content"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Left line: left point fixed, central point animates down */}
            <motion.line
              x1={5}
              y1={12}
              animate={{
                x2: isOpen ? 12 : 12,
                y2: isOpen ? 17 : 12,
              }}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              transition={{ type: "spring", stiffness: 200, damping: 8 }}
            />
            {/* Right line: central point animates down, right point fixed */}
            <motion.line
              animate={{
                x1: isOpen ? 12 : 12,
                y1: isOpen ? 17 : 12,
              }}
              x2={19}
              y2={12}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              transition={{ type: "spring", stiffness: 200, damping: 8 }}
            />
          </svg>
        </div>
        <span
          className="flex gap-2 items-center group cursor-pointer"
          onClick={handleLinkClick}
        >
          <span
            className="text-lg font-semibold text-base-content group-hover:text-primary flex-1"
            data-tina-field={tinaField(data, "faq_item_question")}
          >
            {faq_item_question}
          </span>
          {isHovered && (
            <span
              className="text-base-content/60 group-hover:text-primary/80 transition-colors"
              aria-label="Copy link to this question"
              title="Copy link to this question"
            >
              <FaLink size={18} />
            </span>
          )}
        </span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 border-t border-base-300">
          <div
            className="text-base-content leading-relaxed whitespace-pre-line"
            data-tina-field={tinaField(data, "faq_item_answer")}
          >
            <TinaMarkdownRenderer
              content={faq_item_answer}
              className="prose prose-sm max-w-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
