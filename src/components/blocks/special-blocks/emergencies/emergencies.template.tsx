import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const emergenciesTemplate: Template = {
  name: "emergencies",
  label: "Urgencias Legales",
  ui: {
    defaultItem: {
      emergencies_title: "🚨 Urgencias Legales",
      emergencies_description:
        "Si necesitas asistencia legal inmediata (detenciones, urgencias familiares, etc.), llámanos directamente:",
      emergencies_phone_number: "+34 123 456 789",
      emergencies_button_text: "📞 Llamar Ahora",
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Urgencias Legales",
      "Componente destacado para mostrar información de contacto de emergencia legal con un número de teléfono directo"
    ),
    {
      type: "string",
      name: "emergencies_title",
      label: "Título",
      description: "Título principal del bloque de urgencias",
    },
    {
      type: "string",
      name: "emergencies_description",
      label: "Descripción",
      description: "Texto descriptivo del bloque de urgencias",
    },
    {
      type: "string",
      name: "emergencies_phone_number",
      label: "Número de Teléfono",
      description: "Número de teléfono para contactos de emergencia",
    },
    {
      type: "string",
      name: "emergencies_button_text",
      label: "Texto del Botón",
      description: "Texto mostrado en el botón de llamada",
    },
  ],
};
