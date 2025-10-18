import { BlockDefinition } from "../../types";
import { namePresentationTemplate } from "./name-presentation.template";
import NamePresentation from "./NamePresentation";

export const namePresentationBlock: BlockDefinition = {
  template: namePresentationTemplate,
  component: NamePresentation,
};
