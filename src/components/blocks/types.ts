import { Template } from "tinacms";
import { ComponentType } from "react";

export interface BlockDefinition {
  template: Template;
  component: ComponentType<{ data: any; dataTinaField?: string }>;
}

export type BlockRegistry = BlockDefinition[];