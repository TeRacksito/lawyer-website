import { Template } from "tinacms";

export const mainBlockTemplate: Template = {
  name: "main",
  label: "Main Content Block",
  fields: [
    {
      name: "containerType",
      label: "Container Type",
      type: "string",
      options: [
        { label: "Full Width", value: "full" },
        { label: "Container", value: "container" },
        { label: "Narrow", value: "narrow" }
      ]
    },
    {
      name: "padding",
      label: "Padding",
      type: "string",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" }
      ]
    },
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "string",
      options: [
        { label: "White", value: "white" },
        { label: "Gray Light", value: "gray-light" },
        { label: "Gray", value: "gray" },
        { label: "Transparent", value: "transparent" }
      ]
    },
    {
      name: "minHeight",
      label: "Minimum Height",
      type: "string",
      options: [
        { label: "Auto", value: "auto" },
        { label: "Screen Height", value: "screen" },
        { label: "Half Screen", value: "half-screen" }
      ]
    }
  ]
};
