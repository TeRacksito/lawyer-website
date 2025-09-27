import { truncateText } from "@/components/utils/truncate";
import { Template } from "tinacms";

export const titleTemplate: Template = {
  name: "title",
  label: "Título",
  ui: {
    itemProps: (item) => {
      const titleStr = String(item?.title ?? "");
      const truncated = truncateText(titleStr, 10);
      return {
        label: `${titleTemplate.label}${titleStr ? ` (${truncated})` : ""}`,
      };
    },
    defaultItem: {
      title: "Un Título Atractivo",
      level: "h2",
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
