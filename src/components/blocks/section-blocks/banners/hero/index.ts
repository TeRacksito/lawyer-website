import { BlockDefinition } from "../../../types";
import { heroBlockTemplate } from "./hero.template";
import HeroBlock from "./HeroBlock";

export const heroBlock: BlockDefinition = {
  template: heroBlockTemplate,
  component: HeroBlock,
};
