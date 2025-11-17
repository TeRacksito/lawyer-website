import React from "react";
import { LuAlignLeft, LuAlignRight, LuArrowUp } from "react-icons/lu";
import { Template } from "tinacms";

/**
 * Returns a field configuration for selecting the icon position.
 *
 * @param name - field name (default: "iconPosition")
 * @param label - human friendly label (default: "Posición del icono")
 * @param description - description/help text (default: "Selecciona la posición del icono respecto al título")
 */
export const iconPositionField = (
  name: string = "iconPosition",
  label: string = "Posición del icono",
  description: string = "Selecciona la posición del icono respecto al título"
): Template["fields"][number] => ({
  type: "string",
  name,
  label,
  description,
  options: [
    { value: "top", label: "Arriba", icon: () => <LuArrowUp /> },
    { value: "left", label: "Izquierda", icon: () => <LuAlignLeft /> },
    { value: "right", label: "Derecha", icon: () => <LuAlignRight /> },
  ],
});
