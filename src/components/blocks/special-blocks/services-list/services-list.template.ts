import { Template } from "tinacms";

export const servicesListTemplate: Template = {
  name: "services_list",
  label: "Lista de Servicios",
  ui: {
    defaultItem: {
      searchEnabled: true,
      searchPlaceholder: "¿Buscas algo en concreto?",
      noResultsMessage:
        "No se encontraron servicios que coincidan con tu búsqueda.",
      noGroupsMessage: "No hay grupos de servicios configurados.",
      defaultLinkText: "Más información",
      serviceGroups: [],
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
      type: "string",
      name: "noGroupsMessage",
      label: "Mensaje de Sin Grupos",
      description: "Mensaje mostrado cuando no hay grupos configurados",
    },
    {
      type: "string",
      name: "defaultLinkText",
      label: "Texto del Enlace por Defecto",
      description: "Texto por defecto para los enlaces de servicios",
    },
    {
      type: "object",
      name: "serviceGroups",
      label: "Grupos de Servicios",
      list: true,
      ui: {
        itemProps: (item) => {
          const serviceCount = item?.services?.length || 0;
          return {
            label: `${item?.groupName || "Nuevo Grupo"} (${serviceCount} ${
              serviceCount === 1 ? "servicio" : "servicios"
            })`,
          };
        },
        defaultItem: {
          groupName: "Nuevo Grupo de Servicios",
          groupDescription:
            "Describe brevemente los servicios incluidos en este grupo para ayudar a los visitantes a encontrar lo que necesitan.",
          defaultExpanded: true,
          services: [],
        },
      },
      fields: [
        {
          type: "string",
          name: "groupName",
          label: "Nombre del Grupo",
          description: "Ej. Derecho Penal, Derecho Civil, etc.",
        },
        {
          type: "string",
          name: "groupDescription",
          label: "Descripción del Grupo",
          ui: {
            component: "textarea",
          },
          description: "Descripción breve del grupo de servicios (opcional)",
        },
        {
          type: "image",
          name: "groupImage",
          label: "Imagen del Grupo",
          description:
            "Imagen de banner/hero para el grupo (opcional, aparece en grande)",
        },
        {
          type: "boolean",
          name: "defaultExpanded",
          label: "Servicios Expandidos por Defecto",
          description:
            "Si está activado, los servicios de este grupo estarán expandidos al cargar la página",
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
            defaultItem: {
              title: "Nuevo Servicio",
              description:
                "Describe aquí los detalles de este servicio, qué incluye y cómo puede ayudar a tus clientes.",
              featured: false,
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
                "Texto para el enlace (si se deja vacío, usa el texto por defecto)",
            },
            {
              type: "image",
              name: "icon",
              label: "Icono del Servicio",
              description:
                "Icono pequeño representativo del servicio (opcional)",
            },
            {
              type: "image",
              name: "image",
              label: "Imagen del Servicio",
              description:
                "Imagen grande para la tarjeta de servicio (opcional)",
            },
            {
              type: "string",
              name: "tags",
              label: "Etiquetas",
              description:
                "Etiquetas separadas por comas para búsqueda adicional (ej. penal, defensa, juicio)",
              list: true,
            },
            {
              type: "boolean",
              name: "featured",
              label: "Destacado",
              description: "Marcar este servicio como destacado",
            },
          ],
        },
      ],
    },
  ],
};
