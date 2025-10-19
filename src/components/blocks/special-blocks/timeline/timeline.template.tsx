import React from "react";
import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const timelineTemplate: Template = {
  name: "timeline",
  label: "Línea de Tiempo",

  ui: {
    defaultItem: {
      title: "Hitos de Nuestro Camino",
      items: [
        {
          year: "Fundación",
          title: "Los inicios de nuestra historia",
          description:
            "Describe aquí cómo comenzó el despacho, qué motivó su creación y cuáles fueron los primeros pasos.",
          highlight: true,
        },
        {
          year: "Crecimiento",
          title: "Expansión de servicios",
          description:
            "Cuenta sobre la evolución del despacho, nuevas áreas de práctica y casos destacados.",
        },
        {
          year: "Reconocimiento",
          title: "Consolidación en el sector",
          description:
            "Menciona los logros, reconocimientos y la reputación ganada a lo largo de los años.",
        },
        {
          year: "Actualidad",
          title: "Compromiso con el futuro",
          description:
            "Habla sobre la visión actual, innovación y hacia dónde se dirige el despacho.",
          highlight: true,
        },
      ],
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Línea de Tiempo",
      "Sección que presenta una línea de tiempo con hitos importantes de la empresa"
    ),
    {
      type: "string",
      name: "title",
      label: "Título",
      description: "Título de la sección de línea de tiempo",
    },
    {
      type: "object",
      name: "items",
      label: "Elementos de la Línea de Tiempo",
      description: "Los hitos importantes de la empresa en orden cronológico",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.year ? `${item.year} - ${item.title}` : "Elemento",
          };
        },
      },
      fields: [
        {
          type: "string",
          name: "year",
          label: "Año/Período",
          description: "Año o período del hito",
        },
        {
          type: "string",
          name: "title",
          label: "Título del Hito",
          description: "Nombre o título del hito",
        },
        {
          type: "rich-text",
          name: "description",
          label: "Descripción",
          description: "Descripción detallada del hito",
          isBody: false,
        },
        {
          type: "boolean",
          name: "highlight",
          label: "Destacado",
          description: "Marcar si este hito debe ser destacado visualmente",
        },
      ],
    },
  ],
};
