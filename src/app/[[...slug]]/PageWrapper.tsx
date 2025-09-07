"use client";

import { motion } from "framer-motion";
import { tinaField, useTina } from "tinacms/dist/react";
import { pageBlockComponents } from "../../components/blocks/templates";
import BlocksRenderer from "@/components/blocks/BlocksRenderer";

interface PageWrapperProps {
  query?: string;
  variables?: object;
  data?: any;
  children?: React.ReactNode;
}

export default function PageWrapper({
  query,
  variables,
  data,
  children,
}: PageWrapperProps) {
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
        <BlocksRenderer
          blocks={pageData.blocks}
          components={pageBlockComponents}
          parentData={pageData}
          blocksFieldName="blocks"
        >
          {/* Fallback content when no blocks are present */}
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
        </BlocksRenderer>
      </motion.div>
    );
  }

  // If no Tina data, render children or nothing
  return children || null;
}
