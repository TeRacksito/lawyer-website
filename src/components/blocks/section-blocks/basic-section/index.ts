import { BlockDefinition } from "../../types";
import { basicSectionTemplate } from "./basic-section.template";
import BasicSectionBlock from "./BasicSectionBlock";

export const basicSectionBlock: BlockDefinition = {
  template: basicSectionTemplate,
  component: BasicSectionBlock,
};
