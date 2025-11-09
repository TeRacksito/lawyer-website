import { Template } from "tinacms";

export const callToActionTemplate: Template = {
  name: "call_to_action",
  label: "Botón de acción",
  ui: {
    defaultItem: {
      primaryButton: {
        text: "Solicitar Consulta Gratuita",
        href: "/contact",
      },
      secondaryButton: {
        text: "Ver Nuestros Servicios",
        href: "/services",
      },
    },
  },
  fields: [
    {
      type: "object",
      name: "primaryButton",
      label: "Botón Primario",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Texto del Botón",
        },
        {
          type: "string",
          name: "href",
          label: "Enlace del Botón",
        },
      ],
    },
    {
      type: "object",
      name: "secondaryButton",
      label: "Botón Secundario",
      description: "Botón secundario opcional",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Texto del Botón",
        },
        {
          type: "string",
          name: "href",
          label: "Enlace del Botón",
        },
        {
          type: "string",
          name: "hiddenText",
          label: "Texto Oculto (móvil)",
          description:
            "Texto mostrado solo en escritorio antes del texto principal",
        },
      ],
    },
  ],
};
