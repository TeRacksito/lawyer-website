import { motion } from "framer-motion";

interface TitleBlockProps {
  data: {
    title?: string | null;
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | null;
    textAlign?: string | null;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

const levelClasses: Record<
  NonNullable<TitleBlockProps["data"]["level"]>,
  string
> = {
  h1: "text-4xl md:text-5xl font-bold mb-8 md:mb-12",
  h2: "text-3xl md:text-4xl font-semibold mb-6 md:mb-8",
  h3: "text-2xl md:text-3xl font-semibold mb-5 md:mb-6",
  h4: "text-xl md:text-2xl font-medium mb-4 md:mb-5",
  h5: "text-lg md:text-xl font-medium mb-3 md:mb-4",
  h6: "text-base md:text-lg font-normal mb-2 md:mb-3",
};

const motionHeadings = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
};

export default function TitleBlock({
  data,
  dataTinaField,
  motionDelay,
}: TitleBlockProps) {
  const { title, level } = data;
  const textAlign = data.textAlign || "text-center";

  const HeadingTag =
    level && motionHeadings[level] ? motionHeadings[level] : motion.h2;

  return (
    <div className={`max-w-4xl mx-auto ${textAlign.replace("text-", "text-")}`}>
      {title && (
        <HeadingTag
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: motionDelay, duration: 0.8 }}
          className={levelClasses[level || "h2"]}
          data-tina-field={dataTinaField}
        >
          {title}
        </HeadingTag>
      )}
    </div>
  );
}
