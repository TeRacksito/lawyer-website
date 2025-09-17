import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";
import { Template } from "tinacms";
import { contentBlockTemplates } from "../../content-blocks";
import React from "react";
import { themeField } from "@/components/utils/theme.field";

React;

export const basicSectionTemplate: Template = {
  name: "basic_section",
  label: "Sección Básica",
  ui: {
    defaultItem: {
      theme: "parent",
    },
  },
  fields: [
    themeField,
    {
      type: "object",
      name: "content_blocks",
      label: "Bloques de contenido",
      list: true,
      templates: contentBlockTemplates,
    },
  ],
};
