"use client";

import { getThemeProps } from "@/components/utils/ThemeAttribute";
import BlockRenderer from "../../BlocksRenderer";
import { contentBlockComponents } from "../../content-blocks";

export interface ColumnSectionData {
  content_blocks?: any[];
}

export interface ColumnSectionBlockData {
  theme?: "parent" | "dark" | "light";
  column_rounded_card?: boolean;
  column_compact_width?: boolean;
  column_content_blocks?: {
    column_content_blocks_list?: any[];
  }[];
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
    theme,
    column_rounded_card,
    column_compact_width = false,
    column_content_blocks,
    columns = [],
    show_divider = false,
    verticalAlign = "items-start",
    max_columns = 2,
  } = data;
  const columnCount = Math.min(max_columns, columns?.length || 2);

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

  const gridId = `column-grid-${
    dataTinaField?.replace(/\./g, "-") || "unknown"
  }`;

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
    <section
      {...getThemeProps(theme)}
      className={`${
        column_rounded_card
          ? "card rounded-2xl px-8 shadow-lg max-w-6xl mx-auto bg-base-200 py-5"
          : "px-6 py-3"
      } my-5`}
    >
      {column_content_blocks &&
        column_content_blocks.map((_, index) => (
          <BlockRenderer
            key={index}
            blocks={column_content_blocks[index].column_content_blocks_list}
            components={contentBlockComponents}
            parentData={data}
            blocksFieldName={`column_content_blocks.${index}.column_content_blocks_list`}
          />
        ))}
      {show_divider && <style>{getDividerStyles(columnCount)}</style>}
      <div
        id={gridId}
        className={`grid ${getGridColsClass(
          columnCount
        )} gap-6 px-6 my-8 ${verticalAlign} ${
          column_rounded_card
            ? ""
            : `${column_compact_width ? "max-w-4xl" : "max-w-6xl"} mx-auto`
        }`}
      >
        {columns &&
          columns.map(
            (column, columnIndex) =>
              // <div
              //   key={columnIndex}
              //   className={`flex flex-col relative ${
              //     verticalAlign === "items-stretch" ? "h-full" : ""
              //   }`}
              // >

              column?.content_blocks && column?.content_blocks?.length > 1 ? (
                <div key={columnIndex} className="gap-2 flex flex-col">
                  <BlockRenderer
                    blocks={column.content_blocks}
                    components={contentBlockComponents}
                    parentData={data}
                    blocksFieldName={`columns.${columnIndex}.content_blocks`}
                  />
                </div>
              ) : (
                <BlockRenderer
                  key={columnIndex}
                  blocks={column.content_blocks}
                  components={contentBlockComponents}
                  parentData={data}
                  blocksFieldName={`columns.${columnIndex}.content_blocks`}
                />
              )

            // </div>
          )}
      </div>
    </section>
  );
}
