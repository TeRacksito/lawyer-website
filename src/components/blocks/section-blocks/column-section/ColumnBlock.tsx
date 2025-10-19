"use client";

import BlockRenderer from "../../BlocksRenderer";
import { contentBlockComponents } from "../../content-blocks";

export interface ColumnSectionData {
  content_blocks?: any[];
}

export interface ColumnSectionBlockData {
  columns?: ColumnSectionData[];
  show_divider?: boolean;
  verticalAlign?: string;
}

export interface ColumnSectionBlockProps {
  data: ColumnSectionBlockData;
  dataTinaField?: string;
}

export default function ColumnSectionBlock({
  data,
  dataTinaField,
}: ColumnSectionBlockProps) {
  const {
    columns = [],
    show_divider = false,
    verticalAlign = "items-start",
  } = data;
  const columnCount = columns.length || 2;

  const getGridColsClass = (count: number): string => {
    const colsMap: Record<number, string> = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
    };
    return colsMap[count] || colsMap[2];
  };

  return (
    <div
      className={`grid ${getGridColsClass(
        columnCount
      )} gap-6 px-6 py-8 max-w-4xl mx-auto ${verticalAlign}`}
    >
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`flex flex-col ${
            show_divider && columnIndex !== columns.length - 1
              ? "pr-6 border-r border-gray-300"
              : ""
          }`}
        >
          <BlockRenderer
            blocks={column.content_blocks}
            components={contentBlockComponents}
            parentData={data}
            blocksFieldName={`columns.${columnIndex}.content_blocks`}
          />
        </div>
      ))}
    </div>
  );
}
