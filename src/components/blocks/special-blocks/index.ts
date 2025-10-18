import { BlockRegistry } from "../types";
import { callToActionBlock } from "./call-to-action";
import { localNavigationBlock } from "./local-navigation";
import { namePresentationBlock } from "./name-presentation";
import { servicesListBlock } from "./services-list";

export const specialBlocks: BlockRegistry = [
  callToActionBlock,
  servicesListBlock,
  localNavigationBlock,
  namePresentationBlock,
];

export const specialBlocksTemplates = specialBlocks.map(
  (block) => block.template
);
