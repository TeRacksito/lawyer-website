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
        component: (props) => {
          const { field, input, meta } = props;
          return (
            <div>
              {/* @ts-ignore */}
              <input
                id="yShift"
                type="range"
                min="0"
                max="100"
                step="1"
                {...input}
              />
              <br />
              Value: {input.value}
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
      ui: {
        component: (props) => {
          const {form} = props;
          console.log(`Author Name field visibility: ${form.getRegisteredFields()}`);
          console.log(`Current variant: ${form.getFieldState("blocks.0.variant")?.value}`);
          console.log(`Current variant is landingPage: ${form.getFieldState("blocks.0.variant")?.value == "landingPage"}`);
          return form.getFieldState("blocks.0.variant")?.value == "landingPage" ? true : "hidden";
        }
      }
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
