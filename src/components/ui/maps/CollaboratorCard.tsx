"use client";

import { Collaborator } from "@/components/blocks/special-blocks/interactive-map/InteractiveMap";
import { motion } from "framer-motion";

export interface CollaboratorCardProps {
  collaborator: Collaborator;
  mode: "minified" | "extended";
  animationDelay?: number;
  onContact?: (collaborator: Collaborator) => void;
  dataTinaField?: string;
}

export default function CollaboratorCard({
  collaborator,
  mode,
  animationDelay = 0,
  onContact,
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
      className={`card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-300 ${
        isExtended ? "card-side md:card-normal" : ""
      }`}
      data-tina-field={dataTinaField}
    >
      <div className={`card-body ${isExtended ? "p-6 md:p-4" : "p-4"}`}>
        {/* Extended view with photo */}
        {isExtended && (
          <div className="flex items-start gap-4 md:flex-col md:gap-2">
            <figure className="flex-shrink-0 md:self-center">
              <img
                src="https://placehold.co/600x400"
                alt={collaborator.collaborator_name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover bg-base-300"
              />
            </figure>
            <div className="flex-1 md:flex-none md:text-center">
              <h5 className="card-title text-lg md:text-xl text-primary mb-2">
                {collaborator.collaborator_name}
              </h5>
              <div className="text-xs text-base-content/60 mb-2">
                {collaborator.collaborator_experience}
              </div>
            </div>
          </div>
        )}

        {/* Minified view header */}
        {!isExtended && (
          <h5 className="card-title text-base text-primary mb-2">
            {collaborator.collaborator_name}
          </h5>
        )}

        {/* Location badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {collaborator.collaborator_cities?.map((city, cityIdx) => (
            <span key={cityIdx} className="badge badge-outline badge-sm">
              {city}
            </span>
          ))}
        </div>

        {/* Specialty information */}
        <div className="space-y-2">
          <div className={`text-sm ${isExtended ? "mb-3" : "mb-2"}`}>
            <span className="text-base-content/70">Área principal: </span>
            <span className="font-medium text-base-content">
              {collaborator.collaborator_specialty}
            </span>
          </div>

          {/* Extended description for extended view */}
          {isExtended && (
            <div className="text-sm text-base-content/80 leading-relaxed">
              {collaborator.collaborator_mainFocus}
            </div>
          )}

          {/* Subtle disclaimer */}
          <div className="text-xs text-base-content/50 italic">
            {isExtended
              ? "Capacitado para asesorar en múltiples áreas del derecho"
              : "Asesoramiento integral disponible"}
          </div>
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
