"use client";

import { Collaborator } from "@/components/blocks/special-blocks/interactive-map/InteractiveMap";
import { motion } from "framer-motion";

export interface CollaboratorCardProps {
  collaborator: Collaborator;
  mode: "minified" | "extended";
  animationDelay?: number;
  onContact?: (collaborator: Collaborator) => void;
  onSelectCity?: (city: string) => void;
  selectedCity?: string | null;
  dataTinaField?: string;
}

export default function CollaboratorCard({
  collaborator,
  mode,
  animationDelay = 0,
  onContact,
  onSelectCity,
  selectedCity,
  dataTinaField,
}: CollaboratorCardProps) {
  const isExtended = mode === "extended";

  const handleContactClick = () => {
    if (onContact) {
      onContact(collaborator);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      className={`card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all duration-300 ${
        isExtended ? "" : ""
      }`}
      data-tina-field={dataTinaField}
    >
      {/* Extended view with photo */}
      {isExtended && collaborator.collaborator_photo && (
        <figure className="relative h-48 bg-gradient-to-b from-primary/10 to-transparent overflow-hidden">
          <img
            src={collaborator.collaborator_photo}
            alt={collaborator.collaborator_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 ">
            <span className="text-xs badge badge-lg badge-primary font-semibold shadow-lg">
              +{collaborator.collaborator_experience} años
            </span>
          </div>
        </figure>
      )}

      <div className={`card-body ${isExtended ? "p-6" : "p-5"}`}>
        {/* Header with name and experience */}
        <div className={`${isExtended ? "mb-4" : "mb-3"}`}>
          <div className="flex items-start justify-between gap-3">
            <h5 className="card-title text-lg md:text-xl text-primary mb-3 flex-1">
              {collaborator.collaborator_name}
            </h5>
            {isExtended && !collaborator.collaborator_photo && (
              <div className="badge badge-lg badge-primary font-semibold mt-1">
                <span className="text-xs">
                  +{collaborator.collaborator_experience} años
                </span>
              </div>
            )}
          </div>
          {!isExtended && (
            <div className="flex items-center gap-2">
              <span className="badge badge-primary badge-sm font-semibold">
                +{collaborator.collaborator_experience} años
              </span>
              <span className="text-xs text-base-content/60">experiencia</span>
            </div>
          )}
        </div>

        {/* Location badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="w-full text-xs font-semibold text-base-content/60 uppercase tracking-wide">
            Localizaciones:
          </div>
          {collaborator.collaborator_cities?.map((city, cityIdx) => (
            <span
              key={cityIdx}
              className={`badge badge-sm text-xs ${
                selectedCity === city
                  ? "badge-primary"
                  : "badge-outline cursor-pointer"
              }`}
              onClick={() => onSelectCity?.(city)}
              title={`Seleccionar ciudad ${city}`}
            >
              {city}
            </span>
          ))}
        </div>

        {/* Specialty information */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-3">
            <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-1">
              Área principal
            </div>
            <div className="text-sm font-medium text-base-content">
              {collaborator.collaborator_specialty}
            </div>
          </div>

          {/* Extended description for extended view */}
          {isExtended && (
            <div className="text-sm text-base-content/75 leading-relaxed">
              {collaborator.collaborator_mainFocus}
            </div>
          )}

          {/* Subtle disclaimer */}
          {isExtended && (
            <div className="text-xs text-base-content/50 italic">
              {collaborator.collaborator_footer}
            </div>
          )}
        </div>

        {/* Contact action for extended view */}
        {/* {isExtended && (
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleContactClick}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none" 
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contactar
            </button>
          </div>
        )} */}
      </div>
    </motion.div>
  );
}
