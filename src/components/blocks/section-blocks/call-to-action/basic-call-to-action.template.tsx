import { Template } from "tinacms";

export const basicCallToActionTemplate: Template = {
  name: "basic_call_to_action",
  label: "Basic Call to Action",
  ui: {
    defaultItem: {
      title: "Consulta gratuita",
      description:
        "Ofrecemos una consulta gratuita para evaluar tu caso y ofrecerte soluciones personalizadas.",
      primaryButton: {
        text: "Solicitar Consulta Gratuita",
        href: "/old/contact",
      },
      secondaryButton: {
        text: "Ver Nuestros Servicios",
        href: "/old/services",
        hiddenText: "Reserva una",
      },
      darkTheme: false,
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      description: "Main title for the call to action section",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      description: "Description text below the title",
      ui: {
        component: "textarea",
      },
    },
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
    {
      type: "boolean",
      name: "darkTheme",
      label: "Dark Theme",
      description: "Enable dark theme for the section",
    },
  ],
};
