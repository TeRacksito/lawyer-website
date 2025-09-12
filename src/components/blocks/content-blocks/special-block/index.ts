import { BlockDefinition, BlockRegistry } from "../../types";

import { specialBlockTemplate } from "./special-block.template";
import SpecialBlock from "./SpecialBlock";

export const specialBlock: BlockDefinition = {
  template: specialBlockTemplate,
  component: SpecialBlock,
};
