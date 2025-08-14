// Import all block definitions from their respective folders
import { heroBlock } from "./hero";
import { contentBlock } from "./content";
import { textBlock } from "./text";
import { BlockRegistry } from "./types";
import {
  layoutChildrenBlocks,
  layoutFooterBlocks,
  layoutHeaderBlocks,
} from "./layout-blocks";

// Export array of all available page blocks
// Add or remove blocks here to enable/disable them in the CMS
export const pageBlocks: BlockRegistry = [heroBlock, contentBlock, textBlock];

// Export just the templates for Tina CMS configuration
export const pageBlockTemplates = pageBlocks.map((block) => block.template);

// Export component registry for dynamic rendering
export const pageBlockComponents = pageBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);

export const layoutHeaderBlockComponents = layoutHeaderBlocks.reduce(
  (acc, block) => {
    acc[block.template.name] = block.component;
    return acc;
  },
  {} as Record<string, React.ComponentType<{ data: any, dataTinaField?: string }>>
);

export const layoutChildrenBlockComponents = layoutChildrenBlocks.reduce(
  (acc, block) => {
    acc[block.template.name] = block.component;
    return acc;
  },
  {} as Record<string, React.ComponentType<{ data: any }>>
);

export const layoutFooterBlockComponents = layoutFooterBlocks.reduce(
  (acc, block) => {
    acc[block.template.name] = block.component;
    return acc;
  },
  {} as Record<string, React.ComponentType<{ data: any }>>
);
