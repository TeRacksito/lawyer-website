import { BlockDefinition } from "@/components/blocks/types";
import CounterValueBlock from "./CounterValue";
import { counterValueTemplate } from "./counter-value.template";

export const counterValueBlock: BlockDefinition = {
  component: CounterValueBlock,
  template: counterValueTemplate,
};
