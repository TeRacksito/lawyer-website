import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const blogHeaderTemplate: Template = {
  name: "blog_header",
  label: "Encabezado del Blog",

  ui: {
    defaultItem: {
      blog_header_title: "Título del artículo de blog",
      blog_header_subtitle: "Subtítulo o descripción breve del artículo",
      blog_header_author: {
        blog_header_author_name: "Nombre del Autor",
        blog_header_author_title: "Especialidad o cargo",
      },
      blog_header_publish_date: new Date().toISOString(),
      blog_header_read_time: 5,
      blog_header_tags: [
        { blog_header_tag_name: "Tag 1", blog_header_tag_color: "primary" },
      ],
      blog_header_featured_image: {
        blog_header_featured_image_src: "",
        blog_header_featured_image_alt: "Imagen destacada del artículo",
        blog_header_featured_image_footer: "",
        blog_header_featured_image_author: "",
      },
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Encabezado del Blog",
      "Encabezado completo del artículo de blog que incluye título, información del autor, fecha de publicación, tiempo de lectura, etiquetas e imagen destacada."
    ),
    {
      type: "string",
      name: "blog_header_title",
      label: "Título",
      description: "Título principal del artículo de blog",
      required: true,
    },
    {
      type: "string",
      name: "blog_header_subtitle",
      label: "Subtítulo",
      description: "Descripción breve o subtítulo del artículo",
    },
    {
      type: "object",
      name: "blog_header_author",
      label: "Autor",
      description: "Información del autor del artículo",
      fields: [
        {
          type: "string",
          name: "blog_header_author_name",
          label: "Nombre del Autor",
          description: "Nombre completo del autor",
        },
        {
          type: "string",
          name: "blog_header_author_title",
          label: "Título/Especialidad",
          description: "Cargo, especialidad o descripción del autor",
        },
        {
          type: "image",
          name: "blog_header_author_image",
          label: "Foto de Perfil",
          description: "Foto del perfil del autor",
        },
      ],
    },
    {
      type: "datetime",
      name: "blog_header_publish_date",
      label: "Fecha de Publicación",
      description: "Fecha en que se publicó el artículo",
    },
    {
      type: "number",
      name: "blog_header_read_time",
      label: "Tiempo de Lectura",
      description: "Tiempo estimado de lectura en minutos",
    },
    {
      type: "object",
      name: "blog_header_tags",
      label: "Etiquetas",
      description: "Etiquetas o categorías del artículo",
      list: true,
      ui: {
        itemProps: (item: any) => {
          return { label: item?.blog_header_tag_name };
        },
      },
      fields: [
        {
          type: "string",
          name: "blog_header_tag_name",
          label: "Nombre de la Etiqueta",
          description: "Nombre de la etiqueta",
          required: true,
        },
        {
          type: "string",
          name: "blog_header_tag_color",
          label: "Color",
          description: "Color de la etiqueta (primary, secondary, accent, etc)",
          options: [
            { label: "Primario", value: "primary" },
            { label: "Secundario", value: "secondary" },
            { label: "Acento", value: "accent" },
            { label: "Éxito", value: "success" },
            { label: "Advertencia", value: "warning" },
            { label: "Error", value: "error" },
            { label: "Info", value: "info" },
            { label: "Neutro", value: "neutral" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "blog_header_featured_image",
      label: "Imagen Destacada",
      description: "Imagen principal del artículo con información adicional",
      fields: [
        {
          type: "image",
          name: "blog_header_featured_image_src",
          label: "Imagen",
          description:
            "Imagen principal del artículo que aparece en la parte superior",
        },
        {
          type: "string",
          name: "blog_header_featured_image_alt",
          label: "Texto Alternativo",
          description:
            "Texto alternativo para accesibilidad de la imagen destacada",
        },
        {
          type: "string",
          name: "blog_header_featured_image_footer",
          label: "Pie de Imagen",
          description: "Explicación o descripción adicional de la imagen",
        },
        {
          type: "string",
          name: "blog_header_featured_image_author",
          label: "Autor de la Imagen",
          description: "Crédito o referencia del autor de la imagen",
        },
      ],
    },
  ],
};
