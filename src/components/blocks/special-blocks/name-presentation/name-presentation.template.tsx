import React from "react";
import { Template } from "tinacms";

React;

export const namePresentationTemplate: Template = {
  name: "name_presentation",
  label: "Presentación de Nombre Animada",

  ui: {
    defaultItem: {
      acronym: "CLG",
      acronymWords: [
        {
          letter: "C",
          word: "Consulta",
          description: "Transparencia desde el primer contacto",
        },
        {
          letter: "L",
          word: "Legal",
          description: "Asesoría legal especializada",
        },
        {
          letter: "G",
          word: "Gratuita",
          description: "Primera consulta sin costo",
        },
      ],
      fullName: "Luis Cruz",
      tagline:
        "Donde la excelencia legal se encuentra con el compromiso humano",
      showDescription: true,
    },
  },

  fields: [
    {
      type: "string",
      name: "acronym",
      label: "Acrónimo",
      description: "El acrónimo que se mostrará.",
    },
    {
      type: "object",
      name: "acronymWords",
      label: "Palabras del Acrónimo",
      description:
        "Cada letra del acrónimo con su palabra y descripción asociada",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.letter ? `${item.letter} - ${item.word}` : "Palabra",
          };
        },
      },
      fields: [
        {
          type: "string",
          name: "letter",
          label: "Letra",
          description: "Letra del acrónimo",
        },
        {
          type: "string",
          name: "word",
          label: "Palabra",
          description: "Palabra completa que representa la letra",
        },
        {
          type: "string",
          name: "description",
          label: "Descripción",
          description: "Descripción corta de la palabra",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
    {
      type: "string",
      name: "fullName",
      label: "Nombre Completo",
      description: "El nombre completo que aparece de fondo (ej: Luis Cruz)",
    },
    {
      type: "string",
      name: "tagline",
      label: "Lema",
      description: "Frase descriptiva que aparece debajo",
      ui: {
        component: "textarea",
      },
    },
  ],
};
