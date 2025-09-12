"use client";

import BlockRenderer from "../../BlocksRenderer";
import { contentBlockComponents } from "../../templates";

export interface BasicSectionBlockData {
  theme?: "parent" | "dark" | "light";
  content_blocks?: any[];
  [key: string]: any;
}

export interface BasicSectionBlockProps {
  data: BasicSectionBlockData;
  dataTinaField?: string;
}

export default function BasicSectionBlock({
  data,
  dataTinaField,
}: BasicSectionBlockProps) {
  const { theme = "parent", content_blocks } = data;

  return (
    <section
      className={`py-12`}
      {...(theme !== "parent" ? { "data-theme": theme } : {})}
      data-tina-field={dataTinaField}
    >
      <div className="container mx-auto px-6">
        {/* Render content blocks using BlockRenderer */}
        <BlockRenderer
          blocks={content_blocks}
          components={contentBlockComponents}
          parentData={data}
          blocksFieldName="content_blocks"
          className="space-y-8"
        />
      </div>
    </section>
  );
}
