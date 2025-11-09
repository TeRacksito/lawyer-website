"use client";

import SpainMapComponent from "@/components/ui/maps/SpainMapComponent";
import { motion } from "framer-motion";

export interface Collaborator {
  collaborator_photo?: string;
  collaborator_name?: string;
  collaborator_specialty?: string;
  collaborator_mainFocus?: string;
  collaborator_experience?: string;
  collaborator_footer?: string;
  collaborator_cities?: string[];
}

interface InteractiveMapBlockProps {
  data: {
    interactive_map_collaborators?: Collaborator[];
    bgColor?: string;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function InteractiveMapBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: InteractiveMapBlockProps) {
  const { interactive_map_collaborators = [], bgColor = "bg-base-200" } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.8 }}
      className={`${bgColor} rounded-2xl p-8`}
      data-tina-field={dataTinaField}
    >
      <div className="relative">
        <SpainMapComponent
          collaborators={interactive_map_collaborators}
          showAnimation={true}
          dataTinaField={dataTinaField}
        />
      </div>
    </motion.div>
  );
}
