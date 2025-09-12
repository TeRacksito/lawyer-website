import { tinaField } from "tinacms/dist/react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BasicCallToActionBlockProps {
  data: {
    title?: string | null;
    description?: string | null;
    primaryButton?: {
      text?: string | null;
      href?: string | null;
    } | null;
    secondaryButton?: {
      text?: string | null;
      href?: string | null;
      hiddenText?: string | null;
    } | null;
    darkTheme?: boolean | null;
  };
  dataTinaField?: string;
}

export default function BasicCallToActionBlock({
  data,
  dataTinaField,
}: BasicCallToActionBlockProps) {
  const {
    title,
    description,
    primaryButton,
    secondaryButton,
    darkTheme = false,
  } = data;

  const sectionClasses = ["px-6 py-16", darkTheme ? "bg-base-200" : ""]
    .filter(Boolean)
    .join(" ");

  const themeProps = darkTheme ? { "data-theme": "dark" } : {};

  return (
    <section
      className={sectionClasses}
      {...themeProps}
      data-tina-field={dataTinaField}
    >
      <div className="max-w-4xl mx-auto text-center">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold mb-6"
            data-tina-field={tinaField(data, "title")}
          >
            {title}
          </motion.h2>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg mb-8"
            data-tina-field={tinaField(data, "description")}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
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
              <span
                className={secondaryButton.hiddenText ? "md:underline" : ""}
              >
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
    </section>
  );
}
