import React, { useState } from "react";
import { FormattedText } from "../FormattedText";
import { Template } from "tinacms";
import { IoChevronDown, IoClose } from "react-icons/io5";

React;

interface TemplateInfoConfig {
  bgColor: string;
  borderColor: string;
  titleColor: string;
  buttonColor: string;
  buttonHoverColor: string;
  expandedBorderColor: string;
}

export const getTemplateInfoField = (
  title: string,
  description: string,
  config: TemplateInfoConfig,
  moreInfo: string = ""
): Template["fields"][number] => {
  return {
    type: "boolean",
    name: "_templateInfo",
    searchable: false,
    ui: {
      component: () => {
        const [expanded, setExpanded] = useState(false);

        return (
          <div
            className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 mb-4`}
          >
            <div className="mb-2">
              <h3 className={`text-lg font-semibold ${config.titleColor}`}>
                {title}
              </h3>
            </div>

            <div className="text-sm text-gray-700 mb-3">
              <FormattedText text={description} />
            </div>

            {moreInfo && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className={`flex items-center gap-2 text-sm font-medium ${config.buttonColor} hover:${config.buttonHoverColor} transition-colors`}
                >
                  <IoChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                  {expanded ? "Mostrar Menos" : "Más Información"}
                </button>

                <div
                  className="overflow-y-auto transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: expanded ? "5000px" : "0",
                    opacity: expanded ? 1 : 0,
                  }}
                >
                  <div
                    className={`mt-3 pt-3 border-t ${config.expandedBorderColor}`}
                  >
                    <FormattedText text={moreInfo} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className={`flex w-[100%] items-center justify-end gap-2 text-xs ${config.buttonColor}/70 hover:${config.buttonHoverColor} transition-colors`}
                  >
                    <IoClose className="w-3 h-3" />
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  };
};
