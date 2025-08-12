import { BlockDefinition } from "../../types";
import { headerBlockTemplate } from "./header.template";
import HeaderBlock from "./HeaderBlock";

export const headerBlock: BlockDefinition = {
  template: headerBlockTemplate,
  component: HeaderBlock
};
