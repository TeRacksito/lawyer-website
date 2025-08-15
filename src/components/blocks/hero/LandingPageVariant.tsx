import { tinaField } from "tinacms/dist/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatTitle } from "./FormatTitle";
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
      {/* Landing Page Hero Content */}
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
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
          className="text-base md:text-xl max-w-2xl mx-auto text-muted"
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
