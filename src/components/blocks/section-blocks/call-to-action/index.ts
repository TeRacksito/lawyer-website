import { BlockDefinition } from "../../types";
import { basicCallToActionTemplate } from "./basic-call-to-action.template";
import BasicCallToActionBlock from "./BasicCallToActionBlock";

export const basicCallToActionBlock: BlockDefinition = {
  template: basicCallToActionTemplate,
  component: BasicCallToActionBlock,
};
