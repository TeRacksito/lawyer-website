// Import all layout block definitions from their respective folders
import { BlockRegistry } from "../types";
import { footerBlock } from "./footer";
import { headerBlock } from "./header";
import { mainBlock } from "./main";

export const layoutHeaderBlocks: BlockRegistry = [
  headerBlock,
];

export const layoutChildrenBlocks: BlockRegistry = [
  mainBlock,
];

export const layoutFooterBlocks: BlockRegistry = [
  footerBlock,
];

// Export just the templates for Tina CMS configuration
export const layoutHeaderBlockTemplates = layoutHeaderBlocks.map(block => block.template);
export const layoutChildrenBlockTemplates = layoutChildrenBlocks.map(block => block.template);
export const layoutFooterBlockTemplates = layoutFooterBlocks.map(block => block.template);