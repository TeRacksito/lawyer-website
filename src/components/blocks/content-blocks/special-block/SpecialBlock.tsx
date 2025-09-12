"use client";

import BlockRenderer from "../../BlocksRenderer";
import { specialBlockComponents } from "../../templates";

export interface SpecialBlockData {
  theme?: "parent" | "dark" | "light";
  special_blocks?: any[];
  [key: string]: any;
}

export interface SpecialBlockProps {
  data: SpecialBlockData;
  dataTinaField?: string;
}

export default function SpecialBlock({
  data,
  dataTinaField,
}: SpecialBlockProps) {
  const { theme = "parent", special_blocks } = data;

  return (
    <div
      {...(theme !== "parent" ? { "data-theme": theme } : {})}
      // data-tina-field={dataTinaField}
      {...(special_blocks === null
        ? { "data-tina-field": dataTinaField, className: "p-5" }
        : {})}
    >
      <BlockRenderer
        blocks={special_blocks}
        components={specialBlockComponents}
        parentData={data}
        blocksFieldName="special_blocks"
      />
    </div>
  );
}
