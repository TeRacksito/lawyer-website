import React from "react";
import { Template } from "tinacms";
import { specialBlocksTemplates } from "../../special-blocks";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

React;

export const specialBlockTemplate: Template = {
  name: "special_block",
  label: "Bloque Especial",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.special_blocks
          ? `B.E. (${
              specialBlocksTemplates.find(
                (template) =>
                  template.name === item?.special_blocks[0]._template
              )?.label
            }${
              item?.special_blocks.length > 1
                ? `, +${item?.special_blocks.length - 1}`
                : ""
            })`
          : "Bloque Especial",
      };
    },
    defaultItem: {
      theme: "parent",
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Bloque Especial",
      "Un bloque que contiene multiples componentes especiales.",
      "Los ==componentes especiales== contienen contenido más ==complejo== o ==especializado== que los bloques de contenido estándar. " +
        "Pueden incluir funcionalidades avanzadas, diseños personalizados o integraciones específicas.\n\n" +
        "Un bloque especial actúa como un ==contenedor== que puede albergar **múltiples componentes especiales**, " +
        "permitiendo una mayor flexibilidad y organización del contenido en la página.\n\n" +
        "Al añadir contenido a un bloque especial, notará que **el nombre del mismo habrá cambiado** a `B.E.` " +
        "(Bloque Especial) seguido del nombre del primer componente especial que contenga. " +
        "Esto facilita la identificación rápida del tipo de contenido que alberga el bloque especial."
    ),
    {
      type: "object",
      name: "special_blocks",
      label: "Bloques Especiales",
      list: true,
      templates: specialBlocksTemplates,
    },
  ],
};
