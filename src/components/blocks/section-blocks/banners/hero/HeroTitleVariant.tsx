import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { formatTitle } from "./FormatTitle";
import { formatSubtitle } from "./formatSubtitle";

interface HeroTitleVariantProps {
  data: {
    title?: string | null;
    subtitle?: string | null;
    authorName?: string | null;
  };
}

export default function HeroTitleVariant({ data }: HeroTitleVariantProps) {
  const { title, subtitle, authorName } = data;

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-24 md:w-36 h-0.5 bg-primary"
      />
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-primary text-nowrap"
          data-tina-field={tinaField(data, "title")}
        >
          {formatTitle(title)}
        </motion.h1>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base md:text-xl font-light text-muted"
          data-tina-field={tinaField(data, "subtitle")}
        >
          {formatSubtitle(subtitle, authorName, tinaField(data, "subtitle"))}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-                                                                                                                                                                 24 md:w-36 h-0.5 bg-primary"
      />
    </div>
  );
}
