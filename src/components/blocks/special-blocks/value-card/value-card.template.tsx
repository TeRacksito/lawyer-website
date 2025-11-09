import React from "react";
import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";
import { colorField } from "@/components/utils/template-fields/color.field";
import { iconPositionField } from "@/components/utils/template-fields/icon-position.field";
import { textAlignField } from "@/components/utils/template-fields/text-align.field";
import EmojiTextInput from "@/components/utils/template-fields/EmojiTextInput";
import ReactIconPicker from "@/components/utils/template-fields/ReactIconPicker";
import { getTemplateWarningField } from "@/components/utils/template-fields/template-warning";
import { titleTemplate } from "../../content-blocks/title/title.template";

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
        getTemplateDescriptionField(
          "Icono",
          "Icono que representa el valor. Puedes usar un emoji/texto o seleccionar un icono vectorial.",
          "El icono debe ser representativo del valor o principio que estás destacando. " +
            "Puedes elegir entre usar un ==emoji o texto== personalizado, o seleccionar un ==icono vectorial== de la biblioteca integrada. " +
            "Si seleccionas un icono vectorial, el campo de texto/emoji se deshabilitará."
        ),
        getTemplateWarningField(
          "Emojis inconsistentes",
          "",
          "Los emojis dependen totalmente de la plataforma y el sistema operativo para su renderizado " +
            "*(dicho de como se ve o muestra un elemento gráfico)*. " +
            "Esto puede llevar a que los emojis se **vean diferentes** en distintos dispositivos o navegadores, " +
            "lo que podría afectar la coherencia visual del sitio web. " +
            "Considera usar ==iconos vectoriales== si la consistencia es crucial para tu diseño."
        ),
        {
          ...textAlignField,
          name: "textAlign",
          label: "Alineación del icono",
        },
        {
          type: "string",
          name: "value",
          label: "Icono de texto o emoji",
          description:
            "Escribe un texto o elige emojis que representen el valor.",
          ui: {
            component: EmojiTextInput,
          },
        } as any,
        {
          type: "string",
          name: "fa_icon",
          label: "O bien, elige un icono vectorial",
          description:
            "Elige un icono para representar el valor. Si selecciones un icono, se deshabilitará el icono de texto/emoji.",
          ui: {
            component: ReactIconPicker,
          },
        },
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
