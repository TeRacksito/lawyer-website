"use client";

import { getThemeProps } from "@/components/utils/ThemeAttribute";
import BlockRenderer from "../../BlocksRenderer";
import { specialBlockComponents } from "../../special-blocks";

export interface SpecialBlockData {
  theme?: "parent" | "dark" | "light";
  special_blocks?: {
    special_blocks_list?: any[];
  }[];
  [key: string]: any;
}

export interface SpecialBlockProps {
  data: SpecialBlockData;
  dataTinaField?: string;
  motionDelay?: number;
}

function WrapperSpecialBlock({
  data,
  dataTinaField,
  motionDelay,
}: SpecialBlockProps) {
  const { theme, special_blocks } = data;

  return (
    <>
      {special_blocks &&
        special_blocks.map((_, index) => (
          <BlockRenderer
            key={index}
            blocks={special_blocks[index].special_blocks_list}
            components={specialBlockComponents}
            parentData={data}
            blocksFieldName={`special_blocks.${index}.special_blocks_list`}
          />
        ))}
    </>
  );
}

export default function SpecialBlock({
  data,
  dataTinaField,
  motionDelay,
}: SpecialBlockProps) {
  const { theme, special_blocks } = data;

  const themeObject = getThemeProps(theme);

  // return themeObject || special_blocks === null ? (
  //   <div
  //     {...themeObject}
  //     {...(special_blocks === null
  //       ? { "data-tina-field": dataTinaField, className: "p-5" }
  //       : {})}
  //   >
  //     div
  //     <WrapperSpecialBlock
  //       data={data}
  //       dataTinaField={dataTinaField}
  //       motionDelay={motionDelay}
  //     />
  //   </div>
  // ) : (
  //   <>
  //     no-div
  //     <WrapperSpecialBlock
  //       data={data}
  //       dataTinaField={dataTinaField}
  //       motionDelay={motionDelay}
  //     />
  //   </>
  // );
  return (
    <WrapperSpecialBlock
      data={data}
      dataTinaField={dataTinaField}
      motionDelay={motionDelay}
    />
  );
}
