import { BlockRegistry } from "../types";
import { contentBlock } from "./basic";

export const contentBlocks: BlockRegistry = [contentBlock];

export const contentBlockTemplates = contentBlocks.map(
  (block) => block.template
);
