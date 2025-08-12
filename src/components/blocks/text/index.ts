import { BlockDefinition } from "../types";
import { textBlockTemplate } from "./text.template";
import TextBlock from "./TextBlock";

export const textBlock: BlockDefinition = {
  template: textBlockTemplate,
  component: TextBlock,
};
