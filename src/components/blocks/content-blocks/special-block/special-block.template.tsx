import React from "react";
import { Template } from "tinacms";
import { specialBlocksTemplates } from "../../special-blocks";

React;

export const specialBlockTemplate: Template = {
  name: "special_block",
  label: "Bloque Especial",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.special_blocks
          ? `B.E. (${
              specialBlocksTemplates.find(
                (template) =>
                  template.name === item?.special_blocks[0]._template
              )?.label
            }${
              item?.special_blocks.length > 1
                ? `, +${item?.special_blocks.length - 1}`
                : ""
            })`
          : "Bloque Especial",
      };
    },
    defaultItem: {
      theme: "parent",
    },
  },
  fields: [
    // themeField,
    {
      type: "object",
      name: "special_blocks",
      label: "Bloques Especiales",
      list: true,
      templates: specialBlocksTemplates,
    },
  ],
};
