import { Template } from "tinacms";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const contactFormTemplate: Template = {
  name: "contact_form",
  label: "Formulario de Contacto",
  ui: {
    defaultItem: {
      contact_form_submitButtonText: "Enviar Mensaje",
      contact_form_successMessage:
        "¡Gracias por tu mensaje! Nos pondremos en contacto pronto.",
      contact_form_errorMessage:
        "Ocurrió un error al enviar tu mensaje. Por favor, intenta de nuevo.",
      contact_form_showCategories: true,
      contact_form_categories: [
        "Consulta General",
        "Consulta Legal",
        "Servicios Empresariales",
        "Soporte",
        "Otro",
      ],
      contact_form_showTags: true,
      contact_form_tags: [
        "Urgente",
        "Seguimiento",
        "Cliente Nuevo",
        "Cliente Existente",
      ],
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Formulario de Contacto",
      "Formulario de contacto profesional con persistencia de datos, validación y excelente retroalimentación del usuario. El formulario guarda automáticamente los datos del usuario en localStorage para evitar pérdida de datos.",
      "**Características:**\n- Validación en tiempo real con mensajes de error\n- Persistencia de datos del formulario (auto-guardado)\n- Retroalimentación de éxito/error\n- Estados de carga\n- Opción para limpiar formulario\n- Categorías y etiquetas opcionales\n- Diseño responsive\n- Soporte de accesibilidad"
    ),
    {
      type: "string",
      name: "contact_form_submitButtonText",
      label: "Texto del Botón de Envío",
      description: "Texto mostrado en el botón de envío",
    },
    {
      type: "string",
      name: "contact_form_successMessage",
      label: "Mensaje de Éxito",
      description:
        "Mensaje mostrado cuando el formulario se envía exitosamente",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "contact_form_errorMessage",
      label: "Mensaje de Error",
      description: "Mensaje mostrado cuando el envío del formulario falla",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "boolean",
      name: "contact_form_showCategories",
      label: "Mostrar Categorías",
      description: "Habilitar menú desplegable de selección de categoría",
    },
    {
      type: "string",
      name: "contact_form_categories",
      label: "Categorías",
      description: "Categorías disponibles para que los usuarios seleccionen",
      list: true,
      ui: {
        component: "list",
      },
    },
    {
      type: "boolean",
      name: "contact_form_showTags",
      label: "Mostrar Etiquetas",
      description: "Habilitar selección de etiquetas",
    },
    {
      type: "string",
      name: "contact_form_tags",
      label: "Etiquetas",
      description: "Etiquetas disponibles para que los usuarios seleccionen",
      list: true,
      ui: {
        component: "list",
      },
    }
  ],
};
