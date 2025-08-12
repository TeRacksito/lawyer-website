import { BlockDefinition } from "../../types";
import { mainBlockTemplate } from "./main.template";
import MainBlock from "./MainBlock";

export const mainBlock: BlockDefinition = {
  template: mainBlockTemplate,
  component: MainBlock as React.ComponentType<{ data: any }>
};
