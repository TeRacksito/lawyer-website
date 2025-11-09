import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const faqTemplate: Template = {
  name: "faq",
  label: "Preguntas Frecuentes",
  ui: {
    defaultItem: {
      title: "Preguntas Frecuentes",
      description: "Encuentra respuestas a las preguntas más comunes",
      enableSearch: true,
      items: [
        {
          question: "¿Cuál es tu pregunta?",
          answer: "Esta es la respuesta a tu pregunta.",
        },
      ],
    },
  },
  fields: [
    getTemplateDescriptionField(
      "FAQ Block",
      "Displays a list of frequently asked questions with collapsible answers",
      "Each question can be independently expanded or collapsed to reveal the answer. Supports search functionality."
    ),
    {
      type: "boolean",
      name: "faq_enableSearch",
      label: "Habilitar búsqueda",
      description: "Mostrar un campo de búsqueda para filtrar las preguntas",
    },
    {
      type: "object",
      list: true,
      name: "faq_items",
      label: "Preguntas",
      ui: {
        itemProps: (item: any) => {
          return { label: item?.faq_item_question || "Nueva pregunta" };
        },
      },
      fields: [
        {
          type: "string",
          name: "faq_item_question",
          label: "Pregunta",
          required: true,
        },
        {
          type: "rich-text",
          name: "faq_item_answer",
          label: "Respuesta",
          required: true,
          isBody: false,
        },
      ],
    },
  ],
};
