import { Template } from "tinacms";

export const contentBlockTemplate: Template = {
  name: "content",
  label: "Content Block",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title",
    },
    {
      type: "rich-text",
      name: "content",
      label: "Content",
    },
    {
      type: "string",
      name: "layout",
      label: "Layout",
      options: ["single-column", "two-column", "sidebar-left", "sidebar-right"],
    },
  ],
};
