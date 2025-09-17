import { Template } from "tinacms";

export const titleTemplate: Template = {
  name: "title",
  label: "Título",
  ui: {
    defaultItem: {
      level: "h1",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Título",
      description: "El texto del título.",
    },
    {
      type: "string",
      name: "level",
      label: "Nivel de encabezado",
      description: "Selecciona el nivel del encabezado (h1 ... h6).",
      options: [
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6", value: "h6" },
        { label: "H1 (el más grande, no recomendado)", value: "h1" },
      ],
    },
  ],
};
