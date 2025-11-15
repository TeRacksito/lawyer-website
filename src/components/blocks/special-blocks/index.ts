import { BlockRegistry } from "../types";
import { blogSearcherBlock } from "./blog-searcher";
import { callToActionBlock } from "./call-to-action";
import { counterValueBlock } from "./counter-value";
import { emergenciesBlock } from "./emergencies";
import { faqBlock } from "./faq";
import { interactiveMapBlock } from "./interactive-map";
import { localNavigationBlock } from "./local-navigation";
import { namePresentationBlock } from "./name-presentation";
import { personalCardBlock } from "./personal-card";
import { servicesListBlock } from "./services-list";
import { timelineBlock } from "./timeline";
import { valueCardBlock } from "./value-card";
import { valuesPresentationBlock } from "./values-presentation";

export const specialBlocks: BlockRegistry = [
  callToActionBlock,
  servicesListBlock,
  localNavigationBlock,
  namePresentationBlock,
  valuesPresentationBlock,
  timelineBlock,
  valueCardBlock,
  personalCardBlock,
  counterValueBlock,
  interactiveMapBlock,
  emergenciesBlock,
  faqBlock,
  blogSearcherBlock,
];

export const specialBlocksTemplates = specialBlocks.map(
  (block) => block.template
);

export const specialBlockComponents = specialBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);
