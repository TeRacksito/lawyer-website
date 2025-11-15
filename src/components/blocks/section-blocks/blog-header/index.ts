import { BlockDefinition } from "@/components/blocks/types";
import BlogHeaderBlock from "./BlogHeader";
import { blogHeaderTemplate } from "./blog-header.template";

export const blogHeaderBlock: BlockDefinition = {
  component: BlogHeaderBlock,
  template: blogHeaderTemplate,
};
