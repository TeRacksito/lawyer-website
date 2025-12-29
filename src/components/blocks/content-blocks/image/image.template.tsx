import React from "react";
import { Template } from "tinacms";

React;

export const imageTemplate: Template = {
  name: "image",
  label: "Imagen",

  ui: {
    defaultItem: {
      image_src: "",
      image_alt: "Descripción de la imagen",
      image_footer: null,
      image_author: null,
    },
  },

  fields: [
    {
      type: "image",
      name: "image_src",
      label: "Imagen",
      description: "Selecciona la imagen a mostrar",
      required: true,
    },
    {
      type: "string",
      name: "image_alt",
      label: "Texto alternativo",
      description: "Descripción de la imagen para accesibilidad y SEO",
    },
    {
      type: "rich-text",
      name: "image_footer",
      label: "Pie de imagen",
      description: "Texto que aparece debajo de la imagen (opcional)",
    },
    {
      type: "rich-text",
      name: "image_author",
      label: "Autor/Créditos",
      description: "Créditos o información del autor de la imagen (opcional)",
    },
  ],
};
