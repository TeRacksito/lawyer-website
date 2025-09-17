import { BlockDefinition } from "../../types";
import { paragraphTemplate } from "./paragraph.template";
import ParagraphBlock from "./ParagraphBlock";

export const paragraphBlock: BlockDefinition = {
  template: paragraphTemplate,
  component: ParagraphBlock,
};
