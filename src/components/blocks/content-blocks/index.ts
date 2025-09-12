import { BlockRegistry } from "../types";
import { contentBlock } from "./basic";
import { specialBlock } from "./special-block";

export const contentBlocks: BlockRegistry = [contentBlock, specialBlock];

export const contentBlockTemplates = contentBlocks.map(
  (block) => block.template
);
