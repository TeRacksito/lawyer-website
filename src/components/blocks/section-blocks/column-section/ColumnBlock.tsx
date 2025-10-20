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
  max_columns?: number;
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
    max_columns = 2,
  } = data;
  const columnCount = Math.min(max_columns, columns.length || 2);

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

  const gridId = `column-grid-${Math.random().toString(36).substr(2, 9)}`;

  const getDividerStyles = (count: number): string => {
    if (!show_divider) return "";

    return `
      @media (min-width: 640px) {
        #${gridId} > *:not(:nth-child(2n))::after {
          content: '';
          position: absolute;
          right: -0.75rem;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: rgb(209 213 219);
        }
      }
      ${
        count >= 3
          ? `
      @media (min-width: 1024px) {
        #${gridId} > *:nth-child(2n)::after {
          content: '';
          position: absolute;
          right: -0.75rem;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: rgb(209 213 219);
        }
        #${gridId} > *:nth-child(${count}n)::after {
          display: none;
        }
      }
      `
          : ""
      }
    `;
  };

  return (
    <>
      {show_divider && <style>{getDividerStyles(columnCount)}</style>}
      <div
        id={gridId}
        className={`grid ${getGridColsClass(
          columnCount
        )} gap-6 px-6 py-8 max-w-4xl mx-auto ${verticalAlign}`}
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col relative">
            <BlockRenderer
              blocks={column.content_blocks}
              components={contentBlockComponents}
              parentData={data}
              blocksFieldName={`columns.${columnIndex}.content_blocks`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
