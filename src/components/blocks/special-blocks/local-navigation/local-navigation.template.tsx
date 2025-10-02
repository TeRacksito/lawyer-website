import React from "react";
import { LuAlignLeft, LuAlignCenter } from "react-icons/lu";
import { Template } from "tinacms";

React;

export const localNavigationTemplate: Template = {
  name: "local_navigation",
  label: "Navegación Local",

  ui: {
    defaultItem: {
      flexDirection: "row",
    },
  },

  fields: [
    {
      type: "string",
      name: "flexDirection",
      label: "Dirección de los enlaces",
      options: [
        { value: "row", label: "Fila", icon: () => <LuAlignLeft /> },
        { value: "column", label: "Columna", icon: () => <LuAlignCenter /> },
      ],
    },
    {
      type: "object",
      name: "links",
      label: "Enlaces de Navegación",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label ? item.label : "Enlace" };
        },
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta",
          description: "Texto que se muestra para el enlace",
        },
        {
          type: "string",
          name: "url",
          label: "URL",
          description: "URL a la que apunta el enlace",
        },
      ],
    },
  ],
};
