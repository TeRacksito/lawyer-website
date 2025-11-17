import { BlockDefinition } from "@/components/blocks/types";
import { contactFormTemplate } from "./contact-form.template";
import ContactFormBlock from "./ContactFormBlock";

export const contactFormBlock: BlockDefinition = {
  template: contactFormTemplate,
  component: ContactFormBlock,
};
