import React from "react";
import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const valueCardTemplate: Template = {
  name: "value_card",
  label: "Tarjeta de Valor",

  ui: {
    defaultItem: {
      icon: "⚖️",
      title: "Valor",
      description: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Descripción del valor",
              },
            ],
          },
        ],
      },
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Tarjeta de Valor",
      "Tarjeta individual que representa un valor o principio con icono, título y descripción"
    ),
    {
      type: "string",
      name: "icon",
      label: "Icono",
      description: "Emoji o símbolo que representa el valor",
    },
    {
      type: "string",
      name: "title",
      label: "Título",
      description: "Nombre del valor o principio",
    },
    {
      type: "rich-text",
      name: "description",
      label: "Descripción",
      description: "Descripción breve del valor",
    },
  ],
};
