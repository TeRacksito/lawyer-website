import React from "react";
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
} from "react-icons/lu";
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
    {
      type: "string",
      name: "textAlign",
      label: "Alineación del texto",
      description: "Selecciona la alineación del texto",
      options: [
        { value: "text-left", label: "Izquierda", icon: () => <LuAlignLeft /> },
        {
          value: "text-center",
          label: "Centro",
          icon: () => <LuAlignCenter />,
        },
        { value: "text-right", label: "Derecha", icon: () => <LuAlignRight /> },
        {
          value: "text-justify",
          label: "Justificado",
          icon: () => <LuAlignJustify />,
        },
      ],
    },
    {
      type: "string",
      name: "proseSize",
      label: "Tamaño",
      description: "Selecciona el tamaño",
      options: [
        { value: "prose-lg", label: "Normal" },
        { value: "prose-xl", label: "Grande" },
        { value: "prose-2xl", label: "Extra Grande" },
      ],
    },
  ],
};
