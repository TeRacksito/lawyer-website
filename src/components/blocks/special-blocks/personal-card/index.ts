import { BlockDefinition } from "@/components/blocks/types";
import PersonalCardBlock from "./PersonalCardBlock";
import { personalCardTemplate } from "./personal-card.template";

export const personalCardBlock: BlockDefinition = {
  component: PersonalCardBlock,
  template: personalCardTemplate,
};
