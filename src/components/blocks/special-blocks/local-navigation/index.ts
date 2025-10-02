import { BlockDefinition } from "../../types";
import { localNavigationTemplate } from "./local-navigation.template";
import LocalNavigation from "./LocalNavigation";

export const localNavigationBlock: BlockDefinition = {
  template: localNavigationTemplate,
  component: LocalNavigation,
};
