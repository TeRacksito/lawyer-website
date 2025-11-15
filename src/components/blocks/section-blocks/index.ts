import { BlockRegistry } from "../types";
import { heroBlock } from "./banners/hero";
import { basicSectionBlock } from "./basic-section";
import { blogHeaderBlock } from "./blog-header";
import { columnSectionBlock } from "./column-section";

export const sectionBlocks: BlockRegistry = [
  heroBlock,
  basicSectionBlock,
  columnSectionBlock,
  blogHeaderBlock,
];

export const sectionBlockTemplates = sectionBlocks.map(
  (block) => block.template
);

export const sectionBlockComponents = sectionBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);
