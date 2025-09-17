import { BlockDefinition } from "../../types";
import { titleTemplate } from "./title.template";
import TitleBlock from "./TitleBlock";

export const titleBlock: BlockDefinition = {
  template: titleTemplate,
  component: TitleBlock,
};
