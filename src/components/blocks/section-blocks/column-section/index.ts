import { BlockDefinition } from "../../types";
import { columnSectionTemplate } from "./column.template";
import ColumnSectionBlock from "./ColumnBlock";

export const columnSectionBlock: BlockDefinition = {
  template: columnSectionTemplate,
  component: ColumnSectionBlock,
};
