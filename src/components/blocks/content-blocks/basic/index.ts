import { BlockDefinition } from "../../types";
import { contentBlockTemplate } from "./content.template";
import ContentBlock from "./ContentBlock";

export const contentBlock: BlockDefinition = {
  template: contentBlockTemplate,
  component: ContentBlock,
};
