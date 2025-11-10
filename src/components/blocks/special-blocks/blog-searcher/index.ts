import { BlockDefinition } from "@/components/blocks/types";
import { blogSearcherTemplate } from "./blog-searcher.template";
import BlogSearcher from "./BlogSearcher";

export const blogSearcherBlock: BlockDefinition = {
  template: blogSearcherTemplate,
  component: BlogSearcher,
};
