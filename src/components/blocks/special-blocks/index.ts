import { BlockRegistry } from "../types";
import { callToActionBlock } from "./call-to-action";
import { localNavigationBlock } from "./local-navigation";
import { servicesListBlock } from "./services-list";

export const specialBlocks: BlockRegistry = [
  callToActionBlock,
  servicesListBlock,
  localNavigationBlock,
];

export const specialBlocksTemplates = specialBlocks.map(
  (block) => block.template
);
