"use client";

import { getThemeProps } from "@/components/utils/ThemeAttribute";
import BlockRenderer from "../../BlocksRenderer";
import { contentBlockComponents } from "../../content-blocks";

export interface BasicSectionBlockData {
  theme?: "parent" | "dark" | "light";
  basic_section_rounded_card?: boolean;
  basic_section_content_blocks?: {
    basic_section_content_blocks_list?: any[];
  }[];
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
  const { theme, basic_section_content_blocks, basic_section_rounded_card } =
    data;

  return (
    <section
      {...getThemeProps(theme)}
      {...(basic_section_content_blocks === null
        ? { "data-tina-field": dataTinaField, className: "p-5" }
        : {})}
      className={`${
        basic_section_rounded_card
          ? "card rounded-2xl px-8 shadow-lg max-w-6xl mx-auto bg-base-200 py-5"
          : "px-6 py-3"
      } my-5`}
    >
      {basic_section_content_blocks &&
        basic_section_content_blocks.map((_, index) => (
          <BlockRenderer
            key={index}
            blocks={
              basic_section_content_blocks[index]
                .basic_section_content_blocks_list
            }
            components={contentBlockComponents}
            parentData={data}
            blocksFieldName={`basic_section_content_blocks.${index}.basic_section_content_blocks_list`}
          />
        ))}
    </section>
  );
}
