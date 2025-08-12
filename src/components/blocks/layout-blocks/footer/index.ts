import { BlockDefinition } from "../../types";
import { footerBlockTemplate } from "./footer.template";
import FooterBlock from "./FooterBlock";

export const footerBlock: BlockDefinition = {
  template: footerBlockTemplate,
  component: FooterBlock
};
