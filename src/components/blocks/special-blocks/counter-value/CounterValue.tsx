"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import AnimatedCounter from "@/components/ui/stats/AnimatedCounter";

interface CounterValueBlockProps {
  data: {
    counter_value_value?: number;
    counter_value_label?: string;
    counter_value_prefix?: string;
    counter_value_suffix?: string;
    counter_value_duration?: number;
    bgColor?: string;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function CounterValueBlock({
  data,
  dataTinaField,
  motionDelay = 0,
}: CounterValueBlockProps) {
  const {
    counter_value_value = 0,
    counter_value_label = "",
    counter_value_prefix = "",
    counter_value_suffix = "",
    counter_value_duration = 2000,
    bgColor = "bg-base-200",
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.6 }}
      className={`text-center p-6 ${bgColor} rounded-lg`}
      data-tina-field={dataTinaField}
    >
      <div
        className="text-3xl font-bold text-primary mb-2"
        data-tina-field={tinaField(data, "counter_value_value")}
      >
        <AnimatedCounter
          to={counter_value_value}
          duration={counter_value_duration}
          prefix={counter_value_prefix}
          suffix={counter_value_suffix}
        />
      </div>
      <div
        className="text-sm font-medium"
        data-tina-field={tinaField(data, "counter_value_label")}
      >
        {counter_value_label}
      </div>
    </motion.div>
  );
}
