import { BlockDefinition } from "../../types";
import { servicesListTemplate } from "./services-list.template";
import ServicesListBlock from "./ServicesListBlock";

export const servicesListBlock: BlockDefinition = {
  template: servicesListTemplate,
  component: ServicesListBlock,
};
