import React from "react";
import {
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuAlignJustify,
} from "react-icons/lu";
import { Template } from "tinacms";

React;

export const textAlignField: Template["fields"][number] = {
  type: "string",
  name: "textAlign",
  label: "Alineación del texto",
  description: "Selecciona la alineación del texto",
  options: [
    { value: "text-left", label: "Izquierda", icon: () => <LuAlignLeft /> },
    {
      value: "text-center",
      label: "Centro",
      icon: () => <LuAlignCenter />,
    },
    { value: "text-right", label: "Derecha", icon: () => <LuAlignRight /> },
    {
      value: "text-justify",
      label: "Justificado",
      icon: () => <LuAlignJustify />,
    },
  ],
};
