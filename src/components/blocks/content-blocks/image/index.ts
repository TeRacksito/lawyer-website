import { BlockDefinition } from "../../types";
import { imageTemplate } from "./image.template";
import ImageBlock from "./ImageBlock";

export const imageBlock: BlockDefinition = {
  template: imageTemplate,
  component: ImageBlock,
};
