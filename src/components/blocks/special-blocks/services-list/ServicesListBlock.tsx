"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";

export interface IServiceItem {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  icon?: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
  [key: string]: any;
}

export interface IServiceGroup {
  groupName?: string;
  groupDescription?: string;
  groupImage?: string;
  defaultExpanded?: boolean;
  services: IServiceItem[];
  [key: string]: any;
}

export interface IServicesListBlockData {
  searchEnabled?: boolean;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  noGroupsMessage?: string;
  defaultLinkText?: string;
  serviceGroups: IServiceGroup[];
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
  if (!query.trim() || !text) {
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

function ServiceCard({
  service,
  searchQuery,
  defaultLinkText,
  tinaFieldData,
  index,
}: {
  service: IServiceItem;
  searchQuery: string;
  defaultLinkText: string;
  tinaFieldData: any;
  index: number;
}) {
  const badgeClass = "badge-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ${
        service.featured
          ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100"
          : ""
      }`}
      data-tina-field={tinaFieldData}
    >
      {service.image && (
        <figure className="relative">
          <img
            src={service.image}
            alt={service.title || "Service"}
            className="w-full h-48 object-cover"
            data-tina-field={tinaField(service, "image")}
          />
          {service.featured && (
            <div className={`badge ${badgeClass} absolute top-2 right-2 gap-1`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Destacado
            </div>
          )}
        </figure>
      )}
      <div className="card-body p-6">
        {service.title && (
          <h3 className="card-title text-lg">
            {service.icon && (
              <img
                src={service.icon}
                alt=""
                className="w-6 h-6 object-cover rounded"
                data-tina-field={tinaField(service, "icon")}
              />
            )}
            <div data-tina-field={tinaField(service, "title")}>
              <HighlightMatch text={service.title} query={searchQuery} />
            </div>
          </h3>
        )}
        {service.description && (
          <p
            className="text-sm text-base-content/70 line-clamp-3"
            data-tina-field={tinaField(service, "description")}
          >
            <HighlightMatch text={service.description} query={searchQuery} />
          </p>
        )}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {service.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="badge badge-sm badge-ghost"
                data-tina-field={tinaField(service, "tags")}
              >
                {tag}
              </span>
            ))}
            {service.tags.length > 3 && (
              <span className="badge badge-sm badge-ghost">
                +{service.tags.length - 3}
              </span>
            )}
          </div>
        )}
        {service.link && (
          <div className="card-actions justify-end mt-4">
            <Link
              href={service.link}
              className="link link-primary link-hover font-medium"
              data-tina-field={tinaField(service, "link")}
            >
              {service.linkText || defaultLinkText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ServiceGroupSection({
  group,
  groupIndex,
  searchQuery,
  defaultLinkText,
  tinaFieldData,
  filteredServices,
}: {
  group: IServiceGroup;
  groupIndex: number;
  searchQuery: string;
  defaultLinkText: string;
  tinaFieldData: any;
  filteredServices: IServiceItem[];
}) {
  const hasServices = filteredServices.length > 0;

  const [servicesExpanded, setServicesExpanded] = useState(
    hasServices && (group.defaultExpanded || false)
  );

  const badgeClass = "badge-neutral";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
      className={`border-2 rounded-2xl overflow-hidden bg-base-100 transition-all duration-300 ${
        servicesExpanded
          ? "border-primary shadow-xl"
          : "border-base-300 shadow-md hover:shadow-lg hover:border-base-400"
      }`}
      data-tina-field={tinaFieldData}
    >
      <motion.div
        className={`flex flex-col md:flex-row gap-4 sm:gap-6 p-4 sm:p-6 ${
          hasServices ? "cursor-pointer" : ""
        }`}
        onClick={() => hasServices && setServicesExpanded(!servicesExpanded)}
      >
        {group.groupImage && (
          <motion.div
            layout
            className={`relative flex-shrink-0 mx-auto md:mx-0 ${
              servicesExpanded
                ? "w-20 h-20 md:w-[280px] md:h-[280px]"
                : "w-20 h-20"
            }`}
            style={{
              transition: "width 0.4s ease-in-out, height 0.4s ease-in-out",
            }}
          >
            <div className="rounded-xl overflow-hidden shadow-md w-full h-full">
              <img
                src={group.groupImage}
                alt={group.groupName || "Group"}
                className="w-full h-full object-cover"
                data-tina-field={tinaField(group, "groupImage")}
              />
            </div>
            {servicesExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-primary-content rounded-full p-2 shadow-lg hidden md:flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Content */}
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2
              className={`font-bold transition-all duration-300 ${
                servicesExpanded
                  ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary"
                  : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
              }`}
              data-tina-field={tinaField(group, "groupName")}
            >
              <HighlightMatch
                text={group.groupName || "Nuevo Grupo"}
                query={searchQuery}
              />
            </h2>
            {hasServices && (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 transition-colors ${
                  servicesExpanded ? "text-primary" : "text-base-content/40"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: servicesExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            )}
          </div>

          {hasServices && (
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`badge ${badgeClass} badge-sm sm:badge-md gap-1`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {filteredServices.length}{" "}
                {filteredServices.length === 1 ? "servicio" : "servicios"}
              </span>
            </div>
          )}

          {group.groupDescription && (
            <p
              className={`text-base-content/70 leading-relaxed transition-all duration-300 ${
                servicesExpanded
                  ? "text-xs sm:text-sm md:text-base"
                  : "text-xs sm:text-sm line-clamp-2"
              }`}
              data-tina-field={tinaField(group, "groupDescription")}
            >
              <HighlightMatch
                text={group.groupDescription}
                query={searchQuery}
              />
            </p>
          )}
        </div>
      </motion.div>

      {/* Services Grid - Animated expansion */}
      <AnimatePresence initial={false}>
        {servicesExpanded && hasServices && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t-2 border-primary/20 bg-primary/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
                {filteredServices.map((service, serviceIndex) => (
                  <ServiceCard
                    key={serviceIndex}
                    service={service}
                    searchQuery={searchQuery}
                    defaultLinkText={defaultLinkText}
                    tinaFieldData={tinaField(group, "services", serviceIndex)}
                    index={serviceIndex}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesListBlock({
  data,
  dataTinaField,
}: IServicesListBlockProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    searchEnabled = true,
    searchPlaceholder = "¿Buscas algo en concreto?",
    noResultsMessage = "No se encontraron servicios que coincidan con tu búsqueda.",
    noGroupsMessage = "No hay grupos de servicios configurados.",
    defaultLinkText = "Más información",
    serviceGroups = [],
  } = data;

  const filteredGroups = serviceGroups
    .map((group, index) => {
      const filteredServices = group.services.filter((service) => {
        if (!searchQuery.trim()) return true;

        const matchesTitle = normalize(service.title).includes(
          normalize(searchQuery)
        );
        const matchesDescription = normalize(service.description).includes(
          normalize(searchQuery)
        );
        const matchesTags = service.tags?.some((tag) =>
          normalize(tag).includes(normalize(searchQuery))
        );
        const matchesGroupName = normalize(group.groupName).includes(
          normalize(searchQuery)
        );
        const matchesGroupDescription = normalize(
          group.groupDescription
        ).includes(normalize(searchQuery));

        return (
          matchesTitle ||
          matchesDescription ||
          matchesTags ||
          matchesGroupName ||
          matchesGroupDescription
        );
      });

      return {
        group,
        services: filteredServices,
        index,
      };
    })
    .filter((groupData) => {
      if (!searchQuery.trim()) return true;
      return (
        groupData.services.length > 0 ||
        normalize(groupData.group.groupName).includes(normalize(searchQuery)) ||
        normalize(groupData.group.groupDescription).includes(
          normalize(searchQuery)
        )
      );
    });

  const hasNoGroups = serviceGroups.length === 0;
  const hasNoResults = filteredGroups.length === 0 && searchQuery.trim();
  const isSearching = searchQuery.trim().length > 0;

  const totalServices = filteredGroups.reduce(
    (sum, g) => sum + g.services.length,
    0
  );

  return (
    <section className="px-6 py-3" data-tina-field={dataTinaField}>
      <div className="max-w-7xl mx-auto">
        {searchEnabled && !hasNoGroups && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-end mb-12"
          >
            <div className="w-full sm:w-96 relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pr-20 pl-10 shadow-sm focus:shadow-md transition-shadow"
                aria-label="Buscar servicios"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
                  aria-label="Limpiar búsqueda"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {isSearching && filteredGroups.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden mb-8"
            >
              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Se encontraron <strong>{totalServices}</strong>{" "}
                  {totalServices === 1 ? "servicio" : "servicios"} en{" "}
                  <strong>{filteredGroups.length}</strong>{" "}
                  {filteredGroups.length === 1 ? "grupo" : "grupos"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {hasNoGroups ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-base-200 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-base-content/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p
              className="text-2xl text-base-content/70"
              data-tina-field={tinaField(data, "noGroupsMessage")}
            >
              {noGroupsMessage}
            </p>
          </motion.div>
        ) : hasNoResults ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-base-200 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-base-content/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p
              className="text-2xl text-base-content/70 mb-3"
              data-tina-field={tinaField(data, "noResultsMessage")}
            >
              {noResultsMessage}
            </p>
            <p className="text-base-content/50">
              Intenta con otros términos de búsqueda
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredGroups.map((groupData, groupIndex) => (
              <ServiceGroupSection
                key={groupIndex}
                group={groupData.group}
                groupIndex={groupIndex}
                searchQuery={searchQuery}
                defaultLinkText={defaultLinkText}
                tinaFieldData={tinaField(
                  data,
                  "serviceGroups",
                  groupData.index
                )}
                filteredServices={groupData.services}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
