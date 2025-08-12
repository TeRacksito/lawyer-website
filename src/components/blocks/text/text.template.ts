import { Template } from "tinacms";

export const textBlockTemplate: Template = {
  name: "text",
  label: "Text Block",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "rich-text",
      name: "text",
      label: "Text Content",
    },
    {
      type: "string",
      name: "alignment",
      label: "Text Alignment",
      options: ["left", "center", "right"],
    },
    {
      type: "string",
      name: "size",
      label: "Text Size",
      options: ["small", "medium", "large"],
    },
  ],
};
