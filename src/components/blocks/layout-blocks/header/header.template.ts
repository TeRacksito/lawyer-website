import { Template } from "tinacms";

export const headerBlockTemplate: Template = {
  name: "header",
  label: "Header Block",
  fields: [
    {
      name: "logo",
      label: "Logo Text",
      type: "string"
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
      name: "theme",
      label: "Header Theme",
      type: "string",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Transparent", value: "transparent" }
      ]
    }
  ]
};
