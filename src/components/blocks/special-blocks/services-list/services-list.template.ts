import { Template } from "tinacms";
import { layoutHeaderBlockTemplates } from "../../layout-blocks";

export const servicesListTemplate: Template = {
  name: "services_list",
  label: "Services List",
  ui: {
    defaultItem: {
      title: "Nuestros Servicios",
      subtitle:
        "Descubre cómo podemos ayudarte con soluciones personalizadas y efectivas.",
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
      type: "string",
      name: "title",
      label: "Section Title",
      description: "Main title for the services section",
    },
    {
      type: "string",
      name: "subtitle",
      label: "Section Subtitle",
      description: "Subtitle or description for the services section",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "boolean",
      name: "searchEnabled",
      label: "Enable Search",
      description: "Allow users to search through services",
    },
    {
      type: "string",
      name: "searchPlaceholder",
      label: "Search Placeholder",
      description: "Placeholder text for the search input",
    },
    {
      type: "string",
      name: "noResultsMessage",
      label: "No Results Message",
      description: "Message shown when search returns no results",
    },
    {
      type: "object",
      name: "services",
      label: "Services",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title || "New Service" };
        },
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Service Title",
        },
        {
          type: "string",
          name: "description",
          label: "Service Description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "link",
          label: "Service Link",
          description:
            "URL path to the service detail page (e.g., /services/derecho-penal)",
        },
        {
          type: "string",
          name: "linkText",
          label: "Link Text",
          description: "Text for the 'more info' links on each service card",
        },
        {
          type: "image",
          name: "image",
          label: "Service Image",
          description: "Optional image for the service card",
        },
      ],
    },
  ],
};
