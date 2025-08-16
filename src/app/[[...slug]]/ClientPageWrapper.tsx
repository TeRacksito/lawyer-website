"use client";

import { motion } from "framer-motion";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import { pageBlockComponents } from "../../components/blocks/templates";

interface ClientPageWrapperProps {
  query?: string;
  variables?: object;
  data?: any;
  children?: React.ReactNode;
}

export default function ClientPageWrapper({
  query,
  variables,
  data,
  children,
}: ClientPageWrapperProps) {
  // If we have Tina data, use contextual editing
  if (query && variables && data) {
    const { data: tinaData } = useTina({
      query,
      variables,
      data,
    });

    const pageData = tinaData.pages;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="page-container"
      >
        {/* Render blocks with automated component resolution */}
        {pageData.blocks?.map((block: any, index: number) => {
          // Extract template name from __typename (e.g., "PagesBlocksHero" -> "hero")
          const templateName = block.__typename
            ?.replace("PagesBlocks", "")
            .toLowerCase();
          const BlockComponent = pageBlockComponents[templateName];

          if (!BlockComponent) {
            console.warn(
              `No component found for block type: ${block.__typename} (mapped to: ${templateName})`
            );
            console.warn(
              "Available components:",
              Object.keys(pageBlockComponents)
            );
            return null;
          }

          return (
            <div
              key={index}
              data-tina-field={tinaField(pageData, `blocks.${index}`)}
            >
              <BlockComponent data={block} />
            </div>
          );
        })}

        {/* Render default content if no blocks are present */}
        {(!pageData.blocks || pageData.blocks.length === 0) && (
          <div className="prose max-w-none p-8">
            <h1 data-tina-field={tinaField(pageData, "title")}>
              {pageData.title}
            </h1>
            {pageData.description && (
              <p data-tina-field={tinaField(pageData, "description")}>
                {pageData.description}
              </p>
            )}
            <p>
              This page has no content blocks configured. Please add some blocks
              using the Tina CMS.
            </p>
          </div>
        )}
      </motion.div>
    );
  }
}
