import { BlockRegistry } from "../types";
import { basicCallToActionBlock } from "./call-to-action";

export const specialBlocks: BlockRegistry = [basicCallToActionBlock];

export const specialBlocksTemplates = specialBlocks.map(
  (block) => block.template
);
