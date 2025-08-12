import { Template } from "tinacms";

export const heroBlockTemplate: Template = {
  name: "hero",
  label: "Hero Section",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Hero Title",
    },
    {
      type: "string",
      name: "subtitle",
      label: "Hero Subtitle",
    },
    {
      type: "rich-text",
      name: "content",
      label: "Hero Content",
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Background Image",
    },
    {
      type: "object",
      name: "cta",
      label: "Call to Action",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Button Text",
        },
        {
          type: "string",
          name: "link",
          label: "Button Link",
        },
        {
          type: "string",
          name: "variant",
          label: "Button Style",
          options: ["primary", "secondary", "outline"],
        },
      ],
    },
  ],
};
