import { textAlignField } from "@/components/utils/template-fields/text-align.field";
import React from "react";
import { Template } from "tinacms";

React;

export const paragraphTemplate: Template = {
  name: "paragraph",
  label: "Párrafo",

  ui: {
    defaultItem: {
      text: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Texto del nuevo párrafo...",
              },
            ],
          },
        ],
      },
      textAlign: "text-left",
      proseSize: "prose-lg",
    },
  },

  fields: [
    {
      type: "rich-text",
      name: "text",
      label: "Texto",
      description: "Contenido del párrafo",
    },
    textAlignField,
    {
      type: "string",
      name: "proseSize",
      label: "Tamaño",
      description: "Selecciona el tamaño",
      options: [
        { value: "prose", label: "Pequeño" },
        { value: "prose-lg", label: "Normal" },
        { value: "prose-xl", label: "Grande" },
        { value: "prose-2xl", label: "Extra Grande" },
      ],
    },
  ],
};
