import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const personalCardTemplate: Template = {
  name: "personal_card",
  label: "Tarjeta Personal",

  ui: {
    defaultItem: {
      personal_card_image: "",
      personal_card_name: "Nombre del Miembro",
      personal_card_position: "Posición",
      personal_card_location: "Ubicación",
      personal_card_description: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Descripción breve del miembro del equipo.",
              },
            ],
          },
        ],
      },
      personal_card_specialties: [
        "Especialidad 1",
        "Especialidad 2",
        "Especialidad 3",
      ],
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Tarjeta Personal",
      "Tarjeta individual para mostrar información de un miembro del equipo con imagen, nombre, posición, ubicación, descripción y especialidades"
    ),
    {
      type: "image",
      name: "personal_card_image",
      label: "Imagen",
      description: "Foto del miembro del equipo",
    },
    {
      type: "string",
      name: "personal_card_name",
      label: "Nombre",
      description: "Nombre completo del miembro",
      required: true,
    },
    {
      type: "string",
      name: "personal_card_position",
      label: "Posición",
      description: "Cargo o título profesional",
    },
    {
      type: "string",
      name: "personal_card_location",
      label: "Ubicación",
      description: "Ciudad o ubicación del miembro",
    },
    {
      type: "rich-text",
      name: "personal_card_description",
      label: "Descripción",
      description: "Descripción breve del miembro y su experiencia",
    },
    {
      type: "string",
      name: "personal_card_specialties",
      label: "Especialidades",
      description: "Lista de especialidades o áreas de expertise",
      list: true,
      ui: {
        component: "tags",
      },
    },
  ],
};
