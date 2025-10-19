import React from "react";
import {
  LuAlignCenterHorizontal,
  LuAlignEndHorizontal,
  LuAlignStartHorizontal,
} from "react-icons/lu";
import { Template } from "tinacms";

React;

export const verticalAlignField: Template["fields"][number] = {
  type: "string",
  name: "verticalAlign",
  label: "Alineación vertical",
  description: "Selecciona la alineación vertical de las columnas",
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
};
