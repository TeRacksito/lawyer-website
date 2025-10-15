import React from "react";
import { Template } from "tinacms";
import { getTemplateInfoField } from "./template-info-base";

React;

export const getTemplateWarningField = (
  title: string,
  description: string,
  moreInfo: string = ""
): Template["fields"][number] => {
  return {
    ...getTemplateInfoField(
      title,
      description,
      {
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        titleColor: "text-yellow-900",
        buttonColor: "text-yellow-600",
        buttonHoverColor: "text-yellow-800",
        expandedBorderColor: "border-yellow-200",
      },
      moreInfo
    ),
    name: "_templateWarning",
  };
};
