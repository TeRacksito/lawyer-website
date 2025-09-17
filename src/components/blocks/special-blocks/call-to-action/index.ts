import { BlockDefinition } from "@/components/blocks/types";
import { callToActionTemplate } from "./call-to-action.template";
import CallToActionBlock from "./CallToActionBlock";

export const callToActionBlock: BlockDefinition = {
  template: callToActionTemplate,
  component: CallToActionBlock,
};
