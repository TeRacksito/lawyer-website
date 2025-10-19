import { BlockRegistry } from "../types";
import { footerBlock } from "./footer";
import { headerBlock } from "./header";

export const layoutHeaderBlocks: BlockRegistry = [headerBlock];

export const layoutFooterBlocks: BlockRegistry = [footerBlock];

export const layoutHeaderBlockTemplates = layoutHeaderBlocks.map(
  (block) => block.template
);
export const layoutFooterBlockTemplates = layoutFooterBlocks.map(
  (block) => block.template
);

export const layoutHeaderBlockComponents = layoutHeaderBlocks.reduce(
  (acc, block) => {
    acc[block.template.name] = block.component;
    return acc;
  },
  {} as Record<
    string,
    React.ComponentType<{ data: any; dataTinaField?: string }>
  >
);

export const layoutFooterBlockComponents = layoutFooterBlocks.reduce(
  (acc, block) => {
    acc[block.template.name] = block.component;
    return acc;
  },
  {} as Record<string, React.ComponentType<{ data: any }>>
);
