"use client";

import { getThemeProps } from "@/components/utils/ThemeAttribute";
import BlockRenderer from "../../BlocksRenderer";
import { specialBlockComponents } from "../../special-blocks";

export interface SpecialBlockData {
  theme?: "parent" | "dark" | "light";
  special_blocks?: {
    special_blocks_list?: any[];
  }[];
  [key: string]: any;
}

export interface SpecialBlockProps {
  data: SpecialBlockData;
  dataTinaField?: string;
  motionDelay?: number;
}

export default function SpecialBlock({
  data,
  dataTinaField,
  motionDelay,
}: SpecialBlockProps) {
  const { theme, special_blocks } = data;

  return (
    <div
      {...getThemeProps(theme)}
      {...(special_blocks === null
        ? { "data-tina-field": dataTinaField, className: "p-5" }
        : {})}
    >
      {special_blocks &&
        special_blocks.map((_, index) => (
          <BlockRenderer
            key={index}
            blocks={special_blocks[index].special_blocks_list}
            components={specialBlockComponents}
            parentData={data}
            blocksFieldName={`special_blocks.${index}.special_blocks_list`}
          />
        ))}
    </div>
  );
}
