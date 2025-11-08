import React from "react";
import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";
import { colorField } from "@/components/utils/template-fields/color.field";
import { iconPositionField } from "@/components/utils/template-fields/icon-position.field";
import { textAlignField } from "@/components/utils/template-fields/text-align.field";
import EmojiTextInput from "@/components/utils/template-fields/EmojiTextInput";

export const valueCardTemplate: Template = {
  name: "value_card",
  label: "Tarjeta de Valor",

  ui: {
    defaultItem: {
      icon: {
        value: "😆",
        textAlign: "text-center",
      },
      value_card_title: {
        value: "Valor",
        textAlign: "text-center",
      },
      description: {
        value: {
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
        textAlign: "text-center",
      },
      bgColor: "bg-base-200",
      disposition: "top",
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Tarjeta de Valor",
      "Tarjeta individual que representa un valor o principio con icono, título y descripción"
    ),
    {
      type: "object",
      name: "icon",
      label: "Icono",
      fields: [
        {
          ...textAlignField,
          name: "textAlign",
          label: "Alineación del icono",
        },
        {
          type: "string",
          name: "value",
          label: "Icono",
          description: "Emoji o símbolo que representa el valor",
          ui: {
            component: EmojiTextInput,
          },
        } as any,
      ],
    },
    {
      type: "object",
      name: "value_card_title",
      label: "Título",
      fields: [
        {
          ...textAlignField,
          name: "textAlign",
          label: "Alineación del título",
        },
        {
          type: "string",
          name: "value",
          label: "Texto del título",
          description: "Nombre del valor o principio",
        },
      ],
    },
    {
      type: "object",
      name: "description",
      label: "Descripción",
      fields: [
        {
          ...textAlignField,
          name: "textAlign",
          label: "Alineación de la descripción",
        },
        {
          type: "rich-text",
          name: "value",
          label: "Texto de la descripción",
          description: "Descripción breve del valor",
        },
      ],
    },
    colorField,
    {
      ...iconPositionField,
      name: "disposition",
      label: "Disposición",
    },
  ],
};
