import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";
import { Template } from "tinacms";
import { contentBlockTemplates } from "../../content-blocks";
import React from "react";

export const basicSectionTemplate: Template = {
  name: "basic_section",
  label: "Sección Básica",
  ui: {
    defaultItem: {
      theme: "parent",
    },
  },
  fields: [
    {
      type: "string",
      name: "theme",
      label: "Tema (colores)",
      description:
        "Elige que tema de colores quieres forzar para este elemento. O usa el tema del elemento padre.",
      options: [
        {
          value: "parent",
          label:
            "'Claro' por defecto, `Oscuro` si el elemento padre es también `Oscuro`.",
          icon: () => <LuSunMoon />,
        },
        {
          value: "dark",
          label: "Fuerza el modo 'Oscuro'.",
          icon: () => <LuMoon />,
        },
        {
          value: "light",
          label: "Fuerza el modo 'Claro'.",
          icon: () => <LuSun />,
        },
      ],
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
