"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdownRenderer } from "@/components/utils/TinaMarkdownRenderer";

interface PersonalCardBlockProps {
  data: {
    personal_card_image?: string;
    personal_card_name?: string;
    personal_card_position?: string;
    personal_card_location?: string;
    personal_card_description?: any;
    personal_card_specialties?: string[];
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function PersonalCardBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: PersonalCardBlockProps) {
  const {
    personal_card_image = "",
    personal_card_name = "",
    personal_card_position = "",
    personal_card_location = "",
    personal_card_description,
    personal_card_specialties = [],
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.6 }}
      className="card bg-base-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      data-tina-field={dataTinaField}
    >
      <figure className="relative">
        <img
          src={
            personal_card_image ||
            `https://placehold.co/300x400?text=${encodeURIComponent(
              personal_card_name
            )}`
          }
          alt={personal_card_name}
          className="w-full h-64 object-cover"
          data-tina-field={tinaField(data, "personal_card_image")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        {personal_card_location && (
          <div className="absolute bottom-2 right-2">
            <div
              className="badge badge-primary badge-sm"
              data-tina-field={tinaField(data, "personal_card_location")}
            >
              {personal_card_location}
            </div>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h4
          className="card-title text-xl"
          data-tina-field={tinaField(data, "personal_card_name")}
        >
          {personal_card_name}
        </h4>
        {personal_card_position && (
          <div
            className="badge badge-primary badge-outline mb-3"
            data-tina-field={tinaField(data, "personal_card_position")}
          >
            {personal_card_position}
          </div>
        )}
        {personal_card_description && (
          <div
            className="text-base-content/80 mb-4 text-sm leading-relaxed prose prose-sm max-w-none"
            data-tina-field={tinaField(data, "personal_card_description")}
          >
            <TinaMarkdownRenderer content={personal_card_description} />
          </div>
        )}
        {personal_card_specialties && personal_card_specialties.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            data-tina-field={tinaField(data, "personal_card_specialties")}
          >
            {personal_card_specialties.map((specialty, i) => (
              <span key={i} className="badge badge-secondary badge-sm">
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
