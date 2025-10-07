import { motion } from "framer-motion";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

interface CallToActionBlockProps {
  data: {
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
  dataTinaField?: string;
  motionDelay?: number;
}

export default function CallToActionBlock({
  data,
  motionDelay,
}: CallToActionBlockProps) {
  const { primaryButton, secondaryButton } = data;

  return (
    <div className="max-w-4xl mx-auto text-center m-3">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: motionDelay, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        {secondaryButton?.href && secondaryButton?.text && (
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
            <span className={secondaryButton.hiddenText ? "md:underline" : ""}>
              {secondaryButton.text}
            </span>
          </Link>
        )}
        {primaryButton?.href && primaryButton?.text && (
          <Link
            href={primaryButton.href}
            className="btn btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-primary transition"
            data-tina-field={tinaField(data, "primaryButton")}
          >
            {primaryButton.text}
          </Link>
        )}
      </motion.div>
    </div>
  );
}
