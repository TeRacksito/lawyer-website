import { Template } from "tinacms";
import { layoutHeaderBlockTemplates } from "../../layout-blocks";

export const servicesListTemplate: Template = {
  name: "services_list",
  label: "Lista de Servicios",
  ui: {
    defaultItem: {
      searchEnabled: true,
      searchPlaceholder: "Buscar servicios...",
      noResultsMessage:
        "No se encontraron servicios que coincidan con tu búsqueda.",
      linkText: "Más información",
      services: [],
    },
  },
  fields: [
    {
      type: "boolean",
      name: "searchEnabled",
      label: "Habilitar Búsqueda",
      description: "Permitir a los usuarios buscar entre los servicios",
    },
    {
      type: "string",
      name: "searchPlaceholder",
      label: "Marcador de Posición de Búsqueda",
      description: "Texto marcador de posición para el campo de búsqueda",
    },
    {
      type: "string",
      name: "noResultsMessage",
      label: "Mensaje de Sin Resultados",
      description: "Mensaje mostrado cuando la búsqueda no devuelve resultados",
    },
    {
      type: "object",
      name: "services",
      label: "Servicios",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title || "Nuevo Servicio" };
        },
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título del Servicio",
        },
        {
          type: "string",
          name: "description",
          label: "Descripción del Servicio",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "link",
          label: "Enlace del Servicio",
          description:
            "Ruta URL a la página de detalle del servicio (ej. /services/derecho-penal)",
        },
        {
          type: "string",
          name: "linkText",
          label: "Texto del Enlace",
          description:
            "Texto para los enlaces de 'más info' en cada tarjeta de servicio",
        },
        {
          type: "image",
          name: "image",
          label: "Imagen del Servicio",
          description: "Imagen opcional para la tarjeta de servicio",
        },
      ],
    },
  ],
};
