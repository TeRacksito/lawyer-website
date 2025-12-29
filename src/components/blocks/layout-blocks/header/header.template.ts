import { Template } from "tinacms";

export const headerBlockTemplate: Template = {
  name: "header",
  label: "Encabezado",
  fields: [
    {
      name: "logo",
      label: "Logo (texto)",
      type: "string",
      description: "Texto principal del logo (ej. CGC)",
    },
    {
      name: "logoSubtext",
      label: "Subtexto del Logo",
      type: "string",
      description: "Subtexto mostrado junto al logo (ej. Luis Cruz)",
    },
    {
      name: "logoTagline",
      label: "Lema del Logo",
      type: "string",
      description:
        "Lema o eslogan mostrado debajo del subtexto (ej. Abogados especialistas)",
    },
    {
      name: "logoImage",
      label: "Imagen del Logo",
      type: "image",
    },
    {
      name: "navigation",
      label: "Enlaces de Navegación",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.label,
        }),
      },
      fields: [
        {
          name: "label",
          label: "Etiqueta del Enlace",
          type: "string",
        },
        {
          name: "href",
          label: "URL del Enlace",
          type: "string",
        },
        {
          name: "isExternal",
          label: "Es Enlace Externo",
          type: "boolean",
        },
      ],
    },
    {
      name: "ctaButton",
      label: "Botón de Llamado a la Acción",
      type: "object",
      fields: [
        {
          name: "text",
          label: "Texto del Botón",
          type: "string",
        },
        {
          name: "href",
          label: "URL del Botón",
          type: "string",
        },
        {
          name: "show",
          label: "Mostrar Botón",
          type: "boolean",
        },
      ],
    },
    {
      name: "isSticky",
      label: "Encabezado Fijo",
      type: "boolean",
      description: "Hacer que el encabezado se pegue arriba al hacer scroll",
    },
  ],
};
