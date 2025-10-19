import { BlockDefinition } from "@/components/blocks/types";
import { timelineTemplate } from "./timeline.template";
import TimelineBlock from "./TimelineBlock";

export const timelineBlock: BlockDefinition = {
  template: timelineTemplate,
  component: TimelineBlock,
};
