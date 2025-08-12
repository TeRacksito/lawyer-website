import { Template } from "tinacms";
import { ComponentType } from "react";

export interface BlockDefinition {
  template: Template;
  component: ComponentType<{ data: any }>;
}

export type BlockRegistry = BlockDefinition[];
