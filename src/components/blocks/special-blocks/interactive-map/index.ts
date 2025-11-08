import { BlockDefinition } from "@/components/blocks/types";
import InteractiveMapBlock from "./InteractiveMap";
import { interactiveMapTemplate } from "./interactive-map.template";

export const interactiveMapBlock: BlockDefinition = {
  component: InteractiveMapBlock,
  template: interactiveMapTemplate,
};
