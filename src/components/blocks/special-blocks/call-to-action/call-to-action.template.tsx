import { Template } from "tinacms";

export const callToActionTemplate: Template = {
  name: "call_to_action",
  label: "Botón de acción",
  ui: {
    defaultItem: {
      primaryButton: {
        text: "Solicitar Consulta Gratuita",
        href: "/old/contact",
      },
      secondaryButton: {
        text: "Ver Nuestros Servicios",
        href: "/old/services",
      },
    },
  },
  fields: [
    {
      type: "object",
      name: "primaryButton",
      label: "Primary Button",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Button Text",
        },
        {
          type: "string",
          name: "href",
          label: "Button Link",
        },
      ],
    },
    {
      type: "object",
      name: "secondaryButton",
      label: "Secondary Button",
      description: "Optional secondary button like in about layout",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Button Text",
        },
        {
          type: "string",
          name: "href",
          label: "Button Link",
        },
        {
          type: "string",
          name: "hiddenText",
          label: "Hidden Text (mobile)",
          description: "Text shown only on desktop before main text",
        },
      ],
    },
  ],
};
