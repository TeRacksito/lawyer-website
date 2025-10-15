import React from "react";
import { Template } from "tinacms";
import { getTemplateInfoField } from "./template-info-base";

React;

export const getTemplateDescriptionField = (
  title: string,
  description: string,
  moreInfo: string = ""
): Template["fields"][number] => {
  return {
    ...getTemplateInfoField(
      title,
      description,
      {
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        titleColor: "text-blue-900",
        buttonColor: "text-blue-600",
        buttonHoverColor: "text-blue-800",
        expandedBorderColor: "border-blue-200",
      },
      moreInfo
    ),
    name: "_templateDescription",
  };
};
