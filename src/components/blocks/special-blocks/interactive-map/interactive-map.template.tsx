import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";
import { colorField } from "@/components/utils/template-fields/color.field";
import { getCityOptions } from "@/lib/constants/spanish-cities";

export const interactiveMapTemplate: Template = {
  name: "interactive_map",
  label: "Mapa Interactivo",

  ui: {
    defaultItem: {
      interactive_map_collaborators: [],
      bgColor: "bg-base-200",
    },
  },

  fields: [
    getTemplateDescriptionField(
      "Mapa Interactivo",
      "Componente de mapa interactivo de España que muestra colaboradores por ciudad. Solo las ciudades con colaboradores asignados se mostrarán en el mapa"
    ),
    {
      type: "object",
      name: "interactive_map_collaborators",
      label: "Colaboradores",
      description: "Lista de colaboradores que aparecerán en el mapa",
      list: true,
      ui: {
        itemProps: (item: any) => ({
          label: item?.collaborator_name || "Nuevo Colaborador",
        }),
      },
      fields: [
        {
          type: "string",
          name: "collaborator_name",
          label: "Nombre",
          description: "Nombre completo del colaborador",
        },
        {
          type: "string",
          name: "collaborator_specialty",
          label: "Especialidad",
          description: "Área principal de práctica",
        },
        {
          type: "string",
          name: "collaborator_mainFocus",
          label: "Enfoque Principal",
          description: "Descripción breve del enfoque profesional",
        },
        {
          type: "string",
          name: "collaborator_experience",
          label: "Experiencia",
          description: "Años de experiencia (ej: '15 años de experiencia')",
        },
        {
          type: "string",
          name: "collaborator_cities",
          label: "Ciudad",
          description: "Ciudad donde trabaja el colaborador",
          list: true,
          options: getCityOptions(),
        },
        {
          type: "image",
          name: "collaborator_photo",
          label: "Foto",
          description: "Foto del colaborador",
        },
      ],
    },
    colorField,
  ],
};
