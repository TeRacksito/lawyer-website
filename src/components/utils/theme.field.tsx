import React from "react";
import { LuSunMoon, LuMoon, LuSun } from "react-icons/lu";
import { Template } from "tinacms";

React;

export const themeField: Template["fields"][number] = {
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
};
