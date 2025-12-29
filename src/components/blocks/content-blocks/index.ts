import { BlockRegistry } from "../types";
import { contentBlock } from "./basic";
import { paragraphBlock } from "./paragraph";
import { specialBlock } from "./special-block";
import { titleBlock } from "./title";
import { imageBlock } from "./image";

export const contentBlocks: BlockRegistry = [
  contentBlock,
  titleBlock,
  paragraphBlock,
  imageBlock,
  specialBlock,
];

export const contentBlockTemplates = contentBlocks.map(
  (block) => block.template
);

export const contentBlockComponents = contentBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);
