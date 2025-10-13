import { Template } from "tinacms";
import React from "react";

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
          const { input } = props;
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
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setValue(value - step)}
                  aria-label="Disminuir posición Y"
                  className="bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-md px-2 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
                />
                <button
                  type="button"
                  onClick={() => setValue(value + step)}
                  aria-label="Aumentar posición Y"
                  className="bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-md px-2 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  +
                </button>
              </div>

              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>Valor: </span>
                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={onNumberChange}
                  style={{ width: 64 }}
                />
                <span>%</span>
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
      label: "Nombre del Autor",
      description:
        "Nombre del autor destacado (ej. Luis Cruz) - Solo Página de Aterrizaje",
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
