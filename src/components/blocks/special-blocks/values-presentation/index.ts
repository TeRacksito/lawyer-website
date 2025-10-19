import { BlockDefinition } from "../../types";
import { valuesPresentationTemplate } from "./values-presentation.template";
import ValuesPresentationBlock from "./ValuesPresentationBlock";

export const valuesPresentationBlock: BlockDefinition = {
  template: valuesPresentationTemplate,
  component: ValuesPresentationBlock,
};
