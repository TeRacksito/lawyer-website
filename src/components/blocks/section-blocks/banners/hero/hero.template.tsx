import { Template } from "tinacms";
import React from "react";

export const heroBlockTemplate: Template = {
  name: "hero",
  label: "Hero Section",
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
      label: "Hero Variant",
      options: [
        { value: "heroTitle", label: "Hero Title (Default)" },
        { value: "landingPage", label: "Landing Page" },
      ],
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Background Image",
    },
    {
      type: "boolean",
      name: "fullScreen",
      label: "Full Screen Height",
    },
    {
      type: "number",
      name: "yShift",
      label: "Background Y Position (%)",
      description: "Vertical position of background image (0-100%)",
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
                  aria-label="Decrease Y position"
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
                  aria-label="Increase Y position"
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
                <span>Value: </span>
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
      label: "Title",
      description: "Main title for both Hero Title and Landing Page variants",
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subtitle/Description",
      description:
        "Subtitle for Hero Title variant or description for Landing Page variant",
    },
    // Landing Page variant fields
    {
      type: "string",
      name: "authorName",
      label: "Author Name",
      description:
        "Highlighted author name (e.g., Luis Cruz) - Landing Page only",
    },
    {
      type: "object",
      name: "primaryButton",
      label: "Primary Button",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Button Text",
        },
        {
          type: "string",
          name: "href",
          label: "Button Link",
        },
      ],
    },
    {
      type: "object",
      name: "secondaryButton",
      label: "Secondary Button",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Button Text",
        },
        {
          type: "string",
          name: "href",
          label: "Button Link",
        },
        {
          type: "string",
          name: "hiddenText",
          label: "Hidden Text (mobile)",
          description: "Text shown only on desktop before main text",
        },
      ],
    },
  ],
};
