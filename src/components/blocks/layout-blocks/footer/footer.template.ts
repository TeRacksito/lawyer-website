import { Template } from "tinacms";

export const footerBlockTemplate: Template = {
  name: "footer",
  label: "Footer Block",
  fields: [
    {
      name: "copyright",
      label: "Copyright Text",
      type: "string"
    },
    {
      name: "links",
      label: "Footer Links",
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
      name: "socialLinks",
      label: "Social Media Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.platform
        })
      },
      fields: [
        {
          name: "platform",
          label: "Platform",
          type: "string",
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Twitter", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Instagram", value: "instagram" },
            { label: "YouTube", value: "youtube" }
          ]
        },
        {
          name: "url",
          label: "Profile URL",
          type: "string"
        }
      ]
    },
    {
      name: "theme",
      label: "Footer Theme",
      type: "string",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }
      ]
    }
  ]
};
