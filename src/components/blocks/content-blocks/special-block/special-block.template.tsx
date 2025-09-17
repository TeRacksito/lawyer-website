import React from "react";
import { Template } from "tinacms";
import { specialBlocksTemplates } from "../../special-blocks";

React;

export const specialBlockTemplate: Template = {
  name: "special_block",
  label: "Bloque Especial",
  ui: {
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
