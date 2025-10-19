import { BlockRegistry } from "../types";
import { heroBlock } from "./banners/hero";
import { basicSectionBlock } from "./basic-section";
import { columnSectionBlock } from "./column-section";

export const sectionBlocks: BlockRegistry = [
  heroBlock,
  basicSectionBlock,
  columnSectionBlock,
];

export const sectionBlockTemplates = sectionBlocks.map(
  (block) => block.template
);

export const sectionBlockComponents = sectionBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);
