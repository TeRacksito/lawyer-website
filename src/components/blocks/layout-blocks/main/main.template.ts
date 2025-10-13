import { Template } from "tinacms";

export const mainBlockTemplate: Template = {
  name: "main",
  label: "Bloque de Contenido Principal",
  fields: [
    {
      name: "containerType",
      label: "Tipo de Contenedor",
      type: "string",
      options: [
        { label: "Ancho Completo", value: "full" },
        { label: "Contenedor", value: "container" },
        { label: "Estrecho", value: "narrow" },
      ],
    },
    {
      name: "padding",
      label: "Relleno",
      type: "string",
      options: [
        { label: "Ninguno", value: "none" },
        { label: "Pequeño", value: "small" },
        { label: "Mediano", value: "medium" },
        { label: "Grande", value: "large" },
      ],
    },
    {
      name: "backgroundColor",
      label: "Color de Fondo",
      type: "string",
      options: [
        { label: "Blanco", value: "white" },
        { label: "Gris Claro", value: "gray-light" },
        { label: "Gris", value: "gray" },
        { label: "Transparente", value: "transparent" },
      ],
    },
    {
      name: "minHeight",
      label: "Altura Mínima",
      type: "string",
      options: [
        { label: "Automático", value: "auto" },
        { label: "Altura de Pantalla", value: "screen" },
        { label: "Media Pantalla", value: "half-screen" },
      ],
    },
  ],
};
