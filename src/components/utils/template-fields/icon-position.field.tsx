import React from "react";
import { LuAlignLeft, LuAlignRight, LuArrowUp } from "react-icons/lu";
import { Template } from "tinacms";

export const iconPositionField: Template["fields"][number] = {
  type: "string",
  name: "iconPosition",
  label: "Posición del icono",
  description: "Selecciona la posición del icono respecto al título",
  options: [
    { value: "top", label: "Arriba", icon: () => <LuArrowUp /> },
    { value: "left", label: "Izquierda", icon: () => <LuAlignLeft /> },
    { value: "right", label: "Derecha", icon: () => <LuAlignRight /> },
  ],
};
