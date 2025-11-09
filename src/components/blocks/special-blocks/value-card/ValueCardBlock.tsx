"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdownRenderer } from "@/components/utils/TinaMarkdownRenderer";

import * as FaIcons from "react-icons/fa6";

interface ValueCardBlockProps {
  data: {
    value_card_full_width?: boolean;
    value_card_simplified?: boolean;
    icon?: {
      value?: string;
      fa_icon?: string;
      textAlign?: string;
    };
    value_card_title?: {
      value?: string;
      textAlign?: string;
    };
    description?: {
      value?: any;
      textAlign?: string;
    };
    bgColor?: string;
    disposition?: "top" | "left" | "right";
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function ValueCardBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: ValueCardBlockProps) {
  const {
    value_card_full_width = false,
    value_card_simplified = false,
    icon = {},
    value_card_title = {},
    description = {},
    bgColor = "bg-base-200",
    disposition = "top",
  } = data;

  const iconValue = icon?.value || "";
  const iconAlign = icon?.textAlign || "text-center";
  const titleValue = value_card_title?.value || "";
  const titleAlign = value_card_title?.textAlign || "text-center";
  const descriptionValue = description?.value;
  const descriptionAlign = description?.textAlign || "text-center";

  const IconComponent = icon?.fa_icon
    ? (FaIcons as Record<string, React.ComponentType<{ className?: string }>>)[
        icon.fa_icon
      ]
    : null;

  const getIconContainerClass = (align: string) => {
    const flexAlign =
      align === "text-center"
        ? "justify-center"
        : align === "text-left"
        ? "justify-start"
        : "justify-end";
    return `flex items-center ${flexAlign}`;
  };

  const renderContent = () => {
    const iconElement =
      (IconComponent && (
        <div
          className={`text-4xl flex-shrink-0 ${getIconContainerClass(
            iconAlign
          )}`}
          data-tina-field={tinaField(icon, "fa_icon")}
        >
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconComponent className="w-9 h-9 text-primary" />
          </div>
        </div>
      )) ||
      (iconValue && (
        <div
          className={`text-4xl flex-shrink-0 ${iconAlign}`}
          data-tina-field={tinaField(icon, "value")}
        >
          {iconValue}
        </div>
      ));

    const titleElement = (
      <h3
        className={`card-title text-xl ${titleAlign} block`}
        data-tina-field={tinaField(value_card_title, "value")}
      >
        {titleValue}
      </h3>
    );

    const descriptionElement = (
      <div
        className={`text-base-content/80 prose prose-sm max-w-none ${descriptionAlign} ${value_card_simplified ? "mt-0" : ""}`}
        data-tina-field={tinaField(description, "value")}
      >
        <TinaMarkdownRenderer content={descriptionValue} />
      </div>
    );

    if (disposition === "left") {
      return (
        <div className="flex items-start gap-4">
          {iconElement}
          <div className="flex-1">
            {titleElement}
            {descriptionElement}
          </div>
        </div>
      );
    }

    if (disposition === "right") {
      return (
        <div className="flex items-start gap-4">
          <div className="flex-1">
            {titleElement}
            {descriptionElement}
          </div>
          {iconElement}
        </div>
      );
    }

    return (
      <div className={`${disposition === "top" ? "text-center" : ""}`}>
        {iconElement}
        {titleElement}
        {descriptionElement}
      </div>
    );
  };

  if (value_card_simplified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: motionDelay, duration: 0.6 }}
        className={`${value_card_full_width ? "w-full" : ""}`}
        data-tina-field={dataTinaField}
      >
        <div>{renderContent()}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.6 }}
      className={`card ${bgColor} shadow-lg hover:shadow-xl transition-shadow max-w-4xl ${
        value_card_full_width ? "w-full" : "mx-auto"
      }`}
      data-tina-field={dataTinaField}
    >
      <div className="card-body">{renderContent()}</div>
    </motion.div>
  );
}
