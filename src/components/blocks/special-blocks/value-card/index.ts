import { BlockDefinition } from "@/components/blocks/types";
import ValueCardBlock from "./ValueCardBlock";
import { valueCardTemplate } from "./value-card.template";

export const valueCardBlock: BlockDefinition = {
  component: ValueCardBlock,
  template: valueCardTemplate,
};
