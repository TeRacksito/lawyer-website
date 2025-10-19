import React from "react";
import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const valuesPresentationTemplate: Template = {
  name: "values_presentation",
  label: "Presentación de Valores",

  ui: {
    defaultItem: {
      title: "Nuestros Pilares",
      pillars: [
        {
          letter: "C",
          title: "Consultoría Accesible",
          description: "Confianza desde el primer contacto",
        },
        {
          letter: "L",
          title: "Asesoría Legal",
          description: "Procesos claros y comunicación honesta",
        },
        {
          letter: "G",
          title: "Gratuita",
          description: "Sin costos iniciales para evaluar tu caso",
        },
      ],
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Presentación de Valores",
      "Sección que presenta los pilares o valores principales de la empresa"
    ),
    {
      type: "string",
      name: "title",
      label: "Título",
      description: "Título de la sección",
    },
    {
      type: "object",
      name: "pillars",
      label: "Pilares",
      description: "Los pilares o valores principales de la empresa",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.letter ? `${item.letter} - ${item.title}` : "Pilar",
          };
        },
      },
      fields: [
        {
          type: "string",
          name: "letter",
          label: "Letra",
          description: "Letra que representa el pilar",
        },
        {
          type: "string",
          name: "title",
          label: "Título del Pilar",
          description: "Nombre o título del pilar",
        },
        {
          type: "string",
          name: "description",
          label: "Descripción",
          description: "Descripción breve del pilar",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
