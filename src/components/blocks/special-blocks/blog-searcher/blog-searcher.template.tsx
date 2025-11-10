import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const blogSearcherTemplate: Template = {
  name: "blog_searcher",
  label: "Buscador de Blog",
  ui: {
    defaultItem: {
      placeholder: "Buscar en el blog...",
      noResultsText: "No se encontraron resultados",
      showResultCount: true,
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Buscador de Blog",
      "Componente de búsqueda para posts del blog. Usa Fuse.js para búsqueda fuzzy con índice pre-generado.",
      "Busca en títulos, contenido y etiquetas de los posts. Los archivos de índice se generan en tiempo de build."
    ),
    {
      type: "string",
      name: "placeholder",
      label: "Texto del Placeholder",
      description: "Texto mostrado en el campo de búsqueda",
    },
    {
      type: "string",
      name: "noResultsText",
      label: "Texto Sin Resultados",
      description: "Mensaje mostrado cuando no hay resultados",
    },
    {
      type: "boolean",
      name: "showResultCount",
      label: "Mostrar Contador de Resultados",
      description: "Muestra el número de resultados encontrados",
    },
  ],
};
