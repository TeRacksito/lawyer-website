import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";
import { Template } from "tinacms";
import { contentBlockTemplates } from "../../content-blocks";
import React from "react";
import { truncateText } from "@/components/utils/truncate";
import { themeField } from "@/components/utils/template-fields/theme.field";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

React;

export const basicSectionTemplate: Template = {
  name: "basic_section",
  label: "Sección Básica",
  ui: {
    itemProps: (item) => {
      const nameStr = String(item?.basic_section_name ?? "");
      const truncated = truncateText(nameStr, 15);
      return {
        label: item?.basic_section_name
          ? `Sección (${truncated})`
          : "Sección Básica",
      };
    },
    defaultItem: {
      theme: "parent",
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Sección Básica",
      "Una sección básica que contiene bloques de contenido.",
      "La ==sección por excelencia== para organizar contenido. Si existen otros tipos de secciones, " +
        "es porque su naturaleza o contenido requieren de un contenedor especial. Por ende, " +
        "la sección básica debería ser, como norma general, la única necesaria.\n\n" +
        "Permite mostrar bloques de contenido normal (títulos, párrafos, imágenes, etc.), " +
        "así como mostrar bloques más complejos (bloques especiales).\n\n" +
        "El campo `Nombre de la Sección` tiene meramente el propósito de **organizar mejor** las secciones que existen dentro de una página. " +
        "Si introduce un nombre, el nombre de la sección en cuestión cambiará a `Sección` seguido del valor que introduzca.\n\n" +
        "El campo `Tema` permite definir el esquema de colores de la sección. Las posibles opciones significan, por orden:\n" +
        "• `Heredado`: hereda el tema del contenedor padre (normalmente la página).\n" +
        "• `Oscuro`: siempre tema oscuro.\n" +
        "• `Claro`: siempre tema claro."
    ),
    themeField,
    {
      type: "boolean",
      name: "basic_section_rounded_card",
      label: "Tipo Tarjeta Redondeada",
      description: "Si la sección debe ser una tarjeta redondeada",
    },
    {
      type: "string",
      name: "basic_section_name",
      label: "Nombre de la Sección",
      description:
        "Un nombre descriptivo para esta sección (no se muestra en el sitio)",
    },
    {
      type: "object",
      name: "basic_section_content_blocks",
      label: "Bloques de contenido",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.basic_section_content_blocks_list?.length
              ? `S.B. (${
                  contentBlockTemplates.find(
                    (template) =>
                      template.name ===
                      item?.basic_section_content_blocks_list[0]?._template
                  )?.label
                } ${
                  item?.basic_section_content_blocks_list?.length > 1
                    ? `, +${
                        item?.basic_section_content_blocks_list?.length - 1
                      }`
                    : ""
                })`
              : "Bloque de contenido",
          };
        },
      },
      fields: [
        {
          type: "object",
          name: "basic_section_content_blocks_list",
          label: "Bloques de contenido",
          list: true,
          templates: contentBlockTemplates,
        },
      ],
    },
  ],
};
