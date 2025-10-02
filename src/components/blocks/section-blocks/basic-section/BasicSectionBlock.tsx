"use client";

import { getThemeProps } from "@/components/utils/ThemeAttribute";
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
  const { theme, content_blocks } = data;

  return (
    <section
      {...getThemeProps(theme)}
      // data-tina-field={dataTinaField}
      {...(content_blocks === null
        ? { "data-tina-field": dataTinaField, className: "p-5" }
        : {})}
      className="px-6 py-16"
    >
      {/* <div className="container mx-auto px-6"> */}
      <BlockRenderer
        blocks={content_blocks}
        components={contentBlockComponents}
        parentData={data}
        blocksFieldName="content_blocks"
      />
      {/* </div> */}
    </section>
  );
}
