"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";

interface EmergenciesBlockProps {
  data: {
    emergencies_title?: string;
    emergencies_description?: string;
    emergencies_phone_number?: string;
    emergencies_button_text?: string;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function EmergenciesBlock({
  data,
  motionDelay = 0,
}: EmergenciesBlockProps) {
  const {
    emergencies_title = "🚨 Urgencias Legales",
    emergencies_description = "Si necesitas asistencia legal inmediata (detenciones, urgencias familiares, etc.), llámanos directamente:",
    emergencies_phone_number = "+34 123 456 789",
    emergencies_button_text = "📞 Llamar Ahora",
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.5 }}
      className="bg-error/10 border border-error/20 rounded-2xl p-6 max-w-2xl mx-auto"
    >
      <h3
        className="text-xl font-semibold mb-3 text-error"
        data-tina-field={tinaField(data, "emergencies_title")}
      >
        {emergencies_title}
      </h3>
      <p
        className="text-base-content/80 mb-4"
        data-tina-field={tinaField(data, "emergencies_description")}
      >
        {emergencies_description}
      </p>
      <a
        href={`tel:${emergencies_phone_number.replace(/\s/g, "")}`}
        className="btn btn-error btn-lg w-full"
        data-tina-field={tinaField(data, "emergencies_phone_number")}
      >
        {emergencies_button_text}: {emergencies_phone_number}
      </a>
    </motion.div>
  );
}
