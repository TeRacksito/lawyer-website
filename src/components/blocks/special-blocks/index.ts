import { BlockRegistry } from "../types";
import { callToActionBlock } from "./call-to-action";

export const specialBlocks: BlockRegistry = [callToActionBlock];

export const specialBlocksTemplates = specialBlocks.map(
  (block) => block.template
);
