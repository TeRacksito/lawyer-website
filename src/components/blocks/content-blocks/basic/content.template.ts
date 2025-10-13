import { Template } from "tinacms";

export const contentBlockTemplate: Template = {
  name: "content",
  label: "Bloque de Contenido",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Título de la Sección",
    },
    {
      type: "rich-text",
      name: "content",
      label: "Contenido",
    },
    {
      type: "string",
      name: "layout",
      label: "Layout",
      options: [
        { label: "Columna Única", value: "single-column" },
        { label: "Dos Columnas", value: "two-column" },
        { label: "Barra Lateral Izquierda", value: "sidebar-left" },
        { label: "Barra Lateral Derecha", value: "sidebar-right" },
      ],
    },
  ],
};
