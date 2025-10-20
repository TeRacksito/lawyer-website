import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";
import { verticalAlignField } from "@/components/utils/template-fields/vertical-align.field";
import React from "react";
import { Template } from "tinacms";
import { contentBlockTemplates } from "../../content-blocks";

React;

export const columnSectionTemplate: Template = {
  name: "column",
  label: "Sección Columnas",
  ui: {
    itemProps: (item) => {
      const columnCount = item?.columns?.length ?? 0;
      return {
        label: `Sección Columnas (${columnCount})`,
      };
    },
    defaultItem: {
      show_divider: false,
      verticalAlign: "items-start",
      max_columns: 2,
      columns: [{ content_blocks: [] }, { content_blocks: [] }],
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Sección Columnas",
      "Una sección que organiza el contenido en múltiples columnas",
      "Permite organizar el contenido en columnas. El número de columnas se determina automáticamente " +
        "por la cantidad de items que agregues en la lista de columnas. Cada columna puede contener bloques de contenido normal, " +
        "permitiendo crear layouts más complejos y visualmente interesantes."
    ),
    {
      type: "boolean",
      name: "show_divider",
      label: "Mostrar separador vertical",
      description: "Muestra una línea vertical entre las columnas",
    },
    {
      type: "number",
      name: "max_columns",
      label: "Número máximo de columnas",
      description:
        "Define cuántas columnas se mostrarán por fila en pantallas grandes (2-6).",
    },
    verticalAlignField,
    {
      type: "object",
      name: "columns",
      label: "Columnas",
      list: true,
      ui: {
        itemProps: (item) => {
          const blockCount = item?.content_blocks?.length ?? 0;
          const blockLabels = item?.content_blocks
            ?.map((block: any) => {
              const template = contentBlockTemplates.find(
                (t) => t.name === block._template
              );
              return template?.label;
            })
            .filter(Boolean);
          const previewText =
            blockCount > 0
              ? `${blockLabels?.[0]}${
                  blockCount > 1 ? `, +${blockCount - 1}` : ""
                }`
              : "Vacío";
          return {
            label: `Columna (${previewText})`,
          };
        },
      },
      fields: [
        {
          type: "object",
          name: "content_blocks",
          label: "Bloques de contenido",
          list: true,
          templates: contentBlockTemplates,
        },
      ],
    },
  ],
};
