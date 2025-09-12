import { BlockRegistry } from "../types";
import { heroBlock } from "./banners/hero";
import { basicSectionBlock } from "./basic-section";

export const sectionBlocks: BlockRegistry = [heroBlock, basicSectionBlock];

export const sectionBlockTemplates = sectionBlocks.map(
  (block) => block.template
);
