import { BlockDefinition } from "@/components/blocks/types";
import FaqBlock from "./Faq";
import { faqTemplate } from "./faq.template";

export const faqBlock: BlockDefinition = {
  template: faqTemplate,
  component: FaqBlock,
};
