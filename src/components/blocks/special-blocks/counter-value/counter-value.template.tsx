import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";
import { colorField } from "@/components/utils/template-fields/color.field";

export const counterValueTemplate: Template = {
  name: "counter_value",
  label: "Contador de Valor",

  ui: {
    defaultItem: {
      counter_value_value: 50,
      counter_value_label: "Estadística",
      counter_value_prefix: "",
      counter_value_suffix: "",
      counter_value_duration: 2000,
      bgColor: "bg-base-200",
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Contador de Valor",
      "Tarjeta individual que muestra un valor numérico animado con etiqueta descriptiva"
    ),
    {
      type: "number",
      name: "counter_value_value",
      label: "Valor",
      description: "Número que se mostrará con animación de contador",
    },
    {
      type: "string",
      name: "counter_value_label",
      label: "Etiqueta",
      description: "Texto descriptivo debajo del número",
    },
    {
      type: "string",
      name: "counter_value_prefix",
      label: "Prefijo",
      description: "Texto que aparece antes del número (ej: $, €)",
    },
    {
      type: "string",
      name: "counter_value_suffix",
      label: "Sufijo",
      description: "Texto que aparece después del número (ej: +, %)",
    },
    {
      type: "number",
      name: "counter_value_duration",
      label: "Duración de Animación",
      description: "Duración en milisegundos de la animación del contador",
    },
    colorField,
  ],
};
