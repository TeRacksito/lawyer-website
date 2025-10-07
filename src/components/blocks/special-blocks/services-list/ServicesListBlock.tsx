"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";

export interface IServiceItem {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  image?: string;
  [key: string]: any;
}

export interface IServicesListBlockData {
  searchEnabled?: boolean;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  services: IServiceItem[];
  [key: string]: any;
}

export interface IServicesListBlockProps {
  data: IServicesListBlockData;
  dataTinaField?: string;
}

function normalize(str?: string): string {
  if (str == undefined) return "";

  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) {
    return <span>{text}</span>;
  }

  const normalizedText = normalize(text);
  const normalizedQuery = normalize(query);
  const matchIndex = normalizedText.indexOf(normalizedQuery);

  if (matchIndex === -1) {
    return <span>{text}</span>;
  }

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);

  return (
    <span>
      {before}
      <span className="bg-yellow-200 text-yellow-800 px-1 rounded">
        {match}
      </span>
      {after}
    </span>
  );
}

export default function ServicesListBlock({
  data,
  dataTinaField,
}: IServicesListBlockProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    searchEnabled = true,
    searchPlaceholder,
    noResultsMessage,
    services,
  } = data;

  const filteredServices = searchEnabled
    ? services.filter(
        (service) =>
          normalize(service.title).includes(normalize(searchQuery)) ||
          normalize(service.description).includes(normalize(searchQuery))
      )
    : services;

  const perItemDelay = Math.min(0.1, 0.6 / services.length);

  return (
    <section className="px-6 py-24" data-tina-field={dataTinaField}>
      <div className="max-w-6xl mx-auto">
        {searchEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 max-w-md mx-auto relative"
          >
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Limpiar búsqueda"
              >
                &#10005;
              </button>
            )}
          </motion.div>
        )}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-sm sm:max-w-5xl mx-auto">
            {filteredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * perItemDelay, duration: 0.5 }}
                className="card bg-base-200 shadow-lg"
                data-tina-field={tinaField(data, "services", index)}
              >
                <figure>
                  <img
                    src={service.image || "https://placehold.co/600x400"}
                    alt={`${service.title} Image`}
                    className="w-full h-48 object-cover"
                    data-tina-field={tinaField(service, "image")}
                  />
                </figure>
                <div className="card-body">
                  {service.title && (
                    <h3 className="card-title">
                      <div data-tina-field={tinaField(service, "title")}>
                        <HighlightMatch
                          text={service.title}
                          query={searchQuery}
                        />
                      </div>
                    </h3>
                  )}
                  {service.description && (
                    <p
                      className="mb-4"
                      data-tina-field={tinaField(service, "description")}
                    >
                      <HighlightMatch
                        text={service.description}
                        query={searchQuery}
                      />
                    </p>
                  )}
                  {service.link && (
                    <div className="card-actions justify-end">
                      <Link
                        href={service.link}
                        className="link link-primary link-hover"
                        data-tina-field={tinaField(service, "link")}
                      >
                        {service.linkText || "Más información"}
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p
              className="text-gray-600"
              data-tina-field={tinaField(data, "noResultsMessage")}
            >
              {noResultsMessage}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
