import { Template } from "tinacms";

export const headerBlockTemplate: Template = {
  name: "header",
  label: "Header Block",
  fields: [
    {
      name: "logo",
      label: "Logo Text",
      type: "string",
      description: "Main logo text (e.g., CGC)"
    },
    {
      name: "logoSubtext",
      label: "Logo Subtext",
      type: "string",
      description: "Subtext shown next to logo (e.g., Luis Cruz)"
    },
    {
      name: "logoImage",
      label: "Logo Image",
      type: "image"
    },
    {
      name: "navigation",
      label: "Navigation Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.label
        })
      },
      fields: [
        {
          name: "label",
          label: "Link Label",
          type: "string"
        },
        {
          name: "href",
          label: "Link URL",
          type: "string"
        },
        {
          name: "isExternal",
          label: "Is External Link",
          type: "boolean"
        }
      ]
    },
    {
      name: "ctaButton",
      label: "Call to Action Button",
      type: "object",
      fields: [
        {
          name: "text",
          label: "Button Text",
          type: "string"
        },
        {
          name: "href",
          label: "Button URL",
          type: "string"
        },
        {
          name: "show",
          label: "Show Button",
          type: "boolean"
        }
      ]
    },
    {
      name: "isSticky",
      label: "Sticky Header",
      type: "boolean",
      description: "Make header stick to top when scrolling"
    }
  ]
};
