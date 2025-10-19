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

export const specialBlockComponents = specialBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);
