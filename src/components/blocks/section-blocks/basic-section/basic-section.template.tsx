import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";
import { Template } from "tinacms";
import { contentBlockTemplates } from "../../content-blocks";
import React from "react";
import { truncateText } from "@/components/utils/truncate";
import { themeField } from "@/components/utils/template-fields/theme.field";

React;

export const basicSectionTemplate: Template = {
  name: "basic_section",
  label: "Sección Básica",
  ui: {
    itemProps: (item) => {
      const nameStr = String(item?.name ?? "");
      const truncated = truncateText(nameStr, 15);
      return {
        label: item?.name ? `Sección (${truncated})` : "Sección Básica",
      };
    },
    defaultItem: {
      theme: "parent",
    },
  },
  fields: [
    themeField,
    {
      type: "string",
      name: "name",
      label: "Nombre de la Sección",
      description:
        "Un nombre descriptivo para esta sección (no se muestra en el sitio)",
    },
    {
      type: "object",
      name: "content_blocks",
      label: "Bloques de contenido",
      list: true,
      templates: contentBlockTemplates,
    },
  ],
};
