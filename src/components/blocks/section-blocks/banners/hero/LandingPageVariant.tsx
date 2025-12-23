import { motion } from "framer-motion";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { formatLandingTitle } from "./formatLandingTitle";
import { formatSubtitle } from "./formatSubtitle";

interface LandingPageVariantProps {
  data: {
    title?: string | null;
    subtitle?: string | null;
    authorName?: string | null;
    primaryButton?: {
      text?: string | null;
      href?: string | null;
    } | null;
    secondaryButton?: {
      text?: string | null;
      href?: string | null;
      hiddenText?: string | null;
    } | null;
  };
}

export default function LandingPageVariant({ data }: LandingPageVariantProps) {
  const { title, subtitle, authorName, primaryButton, secondaryButton } = data;

  return (
    <div>
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 md:mb-8 drop-shadow-2xl"
          data-tina-field={tinaField(data, "title")}
        >
          {formatLandingTitle(title)}
        </motion.h1>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed px-4"
          data-tina-field={tinaField(data, "subtitle")}
        >
          {formatSubtitle(subtitle, authorName, tinaField(data, "subtitle"))}
        </motion.p>
      )}

      {(primaryButton?.text || secondaryButton?.text) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-row justify-center gap-4"
        >
          {secondaryButton?.text && secondaryButton?.href && (
            <Link
              href={secondaryButton.href}
              className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl md:btn-ghost"
              data-tina-field={tinaField(data, "secondaryButton")}
            >
              {secondaryButton.hiddenText && (
                <span className="hidden md:inline">
                  {secondaryButton.hiddenText}
                </span>
              )}
              <span className="md:underline">{secondaryButton.text}</span>
            </Link>
          )}
          {primaryButton?.text && primaryButton?.href && (
            <Link
              href={primaryButton.href}
              className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-primary transition"
              data-tina-field={tinaField(data, "primaryButton")}
            >
              {primaryButton.text}
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
