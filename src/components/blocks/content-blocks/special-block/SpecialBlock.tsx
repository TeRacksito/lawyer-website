"use client";

import { getThemeProps } from "@/components/utils/ThemeAttribute";
import BlockRenderer from "../../BlocksRenderer";
import { specialBlockComponents } from "../../special-blocks";

export interface SpecialBlockData {
  theme?: "parent" | "dark" | "light";
  special_blocks?: any[];
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
      <BlockRenderer
        blocks={special_blocks}
        components={specialBlockComponents}
        parentData={data}
        blocksFieldName="special_blocks"
        previousDelay={motionDelay || 0}
      />
    </div>
  );
}
