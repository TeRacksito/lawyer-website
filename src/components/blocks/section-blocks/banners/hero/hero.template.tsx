import { Template } from "tinacms";
import React from "react";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";

export const heroBlockTemplate: Template = {
  name: "hero",
  label: "Sección tipo Hero",
  ui: {
    defaultItem: {
      variant: "heroTitle",
      fullScreen: false,
      yShift: 50,
      title: "Título Principal",
      subtitle: "Subtítulo descriptivo que acompaña al título principal",
    },
  },
  fields: [
    getTemplateDescriptionField(
      "Sección tipo Hero",
      "Una sección pensada para encabezar una página.",
      "Perfecta para el ==inicio de una página== o páginas de aterrizaje.\n\n" +
        "Esta sección **no permite** embeber bloques de contenido adicionales, " +
        "por ende, se *entiende mejor* como un encabezado o título grande.\n\n" +
        "==Permite dos variantes:==\n" +
        "• una más simple con título y subtítulo.\n" +
        "• y otra más completa para páginas de aterrizaje con descripción " +
        "y dos botones de llamada a la acción.\n\n" +
        "Permite además una ==imagen== de fondo y un ==texto a destacar== en el subtítulo."
    ),
    {
      type: "string",
      name: "variant",
      label: "Variante Hero",
      options: [
        { value: "heroTitle", label: "Título Hero (Predeterminado)" },
        { value: "landingPage", label: "Página de Aterrizaje" },
      ],
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Imagen de Fondo",
    },
    {
      type: "boolean",
      name: "fullScreen",
      label: "Altura de Pantalla Completa",
    },
    {
      type: "number",
      name: "yShift",
      label: "Posición Y del Fondo (%)",
      description: "Posición vertical de la imagen de fondo (0-100%)",
      ui: {
        parse: (val) => Number(val),
        component: (props: any) => {
          const { input, field } = props;
          const min = 0;
          const max = 100;
          const step = 1;
          const value = Number(input?.value ?? 0);

          const setValue = (v: number) => {
            const clamped = Math.max(min, Math.min(max, Math.round(v)));
            input.onChange(clamped);
          };

          const onRangeChange = (e: any) => {
            setValue(Number(e.target.value));
          };

          const onNumberChange = (e: any) => {
            const parsed = Number(e.target.value);
            if (!Number.isNaN(parsed)) setValue(parsed);
            else input.onChange("");
          };

          return (
            <div style={{ marginBottom: 16 }}>
              {field.label && (
                <label
                  htmlFor="yShift"
                  style={{
                    display: "block",
                    marginBottom: 4,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#374151",
                  }}
                >
                  {field.label}
                </label>
              )}

              {field.description && (
                <p
                  style={{
                    marginBottom: 12,
                    fontSize: 13,
                    color: "#6B7280",
                    lineHeight: 1.5,
                  }}
                >
                  {field.description}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <button
                  type="button"
                  onClick={() => setValue(value - step)}
                  aria-label="Disminuir posición Y"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    backgroundColor: "#F9FAFB",
                    color: "#374151",
                    border: "1px solid #E5E7EB",
                    borderRadius: 6,
                    fontSize: 18,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                    e.currentTarget.style.borderColor = "#D1D5DB";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9FAFB";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = "2px solid #3B82F6";
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                >
                  −
                </button>

                <input
                  id="yShift"
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={onRangeChange}
                  style={{
                    flex: 1,
                    height: 6,
                    cursor: "pointer",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setValue(value + step)}
                  aria-label="Aumentar posición Y"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    backgroundColor: "#F9FAFB",
                    color: "#374151",
                    border: "1px solid #E5E7EB",
                    borderRadius: 6,
                    fontSize: 18,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                    e.currentTarget.style.borderColor = "#D1D5DB";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9FAFB";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = "2px solid #3B82F6";
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                >
                  +
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    fontWeight: 500,
                  }}
                >
                  Valor:
                </span>
                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={onNumberChange}
                  style={{
                    width: 70,
                    padding: "6px 8px",
                    fontSize: 14,
                    border: "1px solid #E5E7EB",
                    borderRadius: 6,
                    textAlign: "center",
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                  }}
                >
                  %
                </span>
              </div>
            </div>
          );
        },
      },
    },
    {
      type: "string",
      name: "title",
      label: "Título",
      description:
        "Título principal para ambas variantes Título Hero y Página de Aterrizaje",
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subtítulo/Descripción",
      description:
        "Subtítulo para variante Título Hero o descripción para variante Página de Aterrizaje",
    },
    {
      type: "string",
      name: "authorName",
      label: "Texto a destacar",
      description: "Texto a destacar en el subtítulo.",
    },
    {
      type: "object",
      name: "primaryButton",
      label: "Botón Primario",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Texto del Botón",
        },
        {
          type: "string",
          name: "href",
          label: "Enlace del Botón",
        },
      ],
    },
    {
      type: "object",
      name: "secondaryButton",
      label: "Botón Secundario",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Texto del Botón",
        },
        {
          type: "string",
          name: "href",
          label: "Enlace del Botón",
        },
        {
          type: "string",
          name: "hiddenText",
          label: "Texto Oculto (móvil)",
          description:
            "Texto mostrado solo en escritorio antes del texto principal",
        },
      ],
    },
  ],
};
