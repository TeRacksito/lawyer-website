import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";
import { getTemplateWarningField } from "@/components/utils/template-fields/template-warning";
import { textAlignField } from "@/components/utils/template-fields/text-align.field";
import { truncateText } from "@/components/utils/truncate";
import React from "react";
import {
  LuAlignCenterHorizontal,
  LuAlignEndHorizontal,
  LuAlignStartHorizontal,
  LuPanelBottomClose,
} from "react-icons/lu";
import { Template } from "tinacms";

React;

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
      textAlign: "text-center",
      verticalAlign: "items-center",
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Bloque de Título",
      "Añade títulos y encabezados con diferentes niveles. Elige el nivel según la importancia del encabezado dentro de tu página.",
      "==¿Cuándo usar cada nivel?==\n\n" +
        "• **H1**: Título principal de la página; usa solo una vez por página.\n" +
        "• **H2**: Títulos de secciones principales; el más usado para organizar contenido.\n" +
        "• **H3**: Subsecciones dentro de una sección H2.\n" +
        "• **H4**: Encabezados para bloques menores o subtítulos secundarios.\n" +
        "• **H5/H6**: Encabezados muy pequeños; úsalos solo si es necesario.\n\n" +
        "**Recomendación:** Comienza con ==H2== para la mayoría de tus secciones. Los niveles más profundos (H3, H4) son para subsecciones específicas."
    ),
    getTemplateWarningField(
      "Nivel H1",
      "El nivel H1 está reservado para el título principal de la página.",
      "Por ello, debe usarse solo una vez por página. " +
        "Usar múltiples H1 puede afectar negativamente la accesibilidad y el SEO de tu sitio web. " +
        "Asegúrate de utilizar H1 únicamente una vez, y que no exista otro H1 en la misma página (Por ejemplo, " +
        "la ==Sección tipo Hero== incluye un H1 por defecto)."
    ),
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
      description: "Selecciona el nivel del encabezado (H2 ... H6).",
      options: [
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6", value: "h6" },
        { label: "H1 (el más grande, no recomendado)", value: "h1" },
      ],
    },
    textAlignField,
    {
      type: "string",
      name: "verticalAlign",
      label: "Alineación vertical",
      description: "Selecciona la alineación vertical para el texto.",
      options: [
        {
          value: "items-start",
          label: "Arriba",
          icon: () => <LuAlignStartHorizontal />,
        },
        {
          value: "items-center",
          label: "Centro",
          icon: () => <LuAlignCenterHorizontal />,
        },
        {
          value: "items-end",
          label: "Abajo",
          icon: () => <LuAlignEndHorizontal />,
        },
      ],
    },
  ],
};
