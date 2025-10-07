import { BlockRegistry } from "../types";
import { contentBlock } from "./basic";
import { paragraphBlock } from "./paragraph";
import { specialBlock } from "./special-block";
import { titleBlock } from "./title";

export const contentBlocks: BlockRegistry = [
  contentBlock,
  titleBlock,
  paragraphBlock,
  specialBlock,
];

export const contentBlockTemplates = contentBlocks.map(
  (block) => block.template
);
