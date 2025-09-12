import React from "react";
import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";
import { Template } from "tinacms";
import { specialBlocksTemplates } from "../../special-blocks";

React;

console.log(specialBlocksTemplates);

export const specialBlockTemplate: Template = {
  name: "special_block",
  label: "Bloque Especial",
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
      name: "special_blocks",
      label: "Bloques Especiales",
      list: true,
      templates: specialBlocksTemplates,
    },
  ],
};
