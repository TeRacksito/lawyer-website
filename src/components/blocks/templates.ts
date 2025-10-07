import { contentBlocks } from "./content-blocks";
import { layoutFooterBlocks, layoutHeaderBlocks } from "./layout-blocks";
import { heroBlock } from "./section-blocks/banners/hero";
import { basicSectionBlock } from "./section-blocks/basic-section";
import { specialBlocks } from "./special-blocks";
import { BlockRegistry } from "./types";

export const pageBlocks: BlockRegistry = [heroBlock, basicSectionBlock];

export const pageBlockTemplates = pageBlocks.map((block) => block.template);

export const pageBlockComponents = pageBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);

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

export const contentBlockComponents = contentBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);

export const specialBlockComponents = specialBlocks.reduce((acc, block) => {
  acc[block.template.name] = block.component;
  return acc;
}, {} as Record<string, React.ComponentType<{ data: any }>>);
