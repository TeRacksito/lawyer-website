import { Template } from "tinacms";

export const footerBlockTemplate: Template = {
  name: "footer",
  label: "Pie de Página",
  fields: [
    {
      name: "dataTheme",
      label: "Tema",
      type: "string",
      description: "Tema para el componente de pie de página",
    },
    {
      name: "firmInfo",
      label: "Información del despacho",
      type: "object",
      fields: [
        {
          name: "name",
          label: "Nombre del despacho",
          type: "string",
        },
        {
          name: "title",
          label: "Título Profesional",
          type: "string",
        },
        {
          name: "address",
          label: "Dirección",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "phone",
          label: "Número de Teléfono",
          type: "string",
        },
        {
          name: "email",
          label: "Correo Electrónico",
          type: "string",
        },
      ],
    },
    {
      name: "practiceAreas",
      label: "Áreas de Práctica",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Título de la Sección",
          type: "string",
        },
        {
          name: "areas",
          label: "Áreas de Práctica",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => ({
              label: item?.name,
            }),
          },
          fields: [
            {
              name: "name",
              label: "Nombre del Área de Práctica",
              type: "string",
            },
            {
              name: "href",
              label: "URL del Enlace",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "quickLinks",
      label: "Enlaces Rápidos",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Título de la Sección",
          type: "string",
        },
        {
          name: "links",
          label: "Enlaces Rápidos",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => ({
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
          ],
        },
      ],
    },
    {
      name: "legalInfo",
      label: "Información Legal",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Título de la Sección",
          type: "string",
        },
        {
          name: "college",
          label: "Colegio de Abogados",
          type: "string",
        },
        {
          name: "license",
          label: "Número de Licencia",
          type: "string",
        },
        {
          name: "hours",
          label: "Horario de Oficina",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "consultationButtonText",
          label: "Texto del Botón de Consulta",
          type: "string",
        },
        {
          name: "consultationButtonHref",
          label: "Enlace del Botón de Consulta",
          type: "string",
        },
      ],
    },
    {
      name: "legalNotice",
      label: "Aviso Legal",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Título del Aviso Legal",
          type: "string",
        },
        {
          name: "disclaimers",
          label: "Descargos Legales",
          type: "rich-text",
        },
      ],
    },
    {
      name: "legalLinks",
      label: "Enlaces Legales",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: any) => ({
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
      ],
    },
    {
      name: "copyright",
      label: "Información de Copyright",
      type: "object",
      fields: [
        {
          name: "text",
          label: "Texto de Copyright",
          type: "string",
        },
      ],
    },
  ],
};
