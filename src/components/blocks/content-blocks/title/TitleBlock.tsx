import { motion } from "framer-motion";

interface TitleBlockProps {
  data: {
    title?: string | null;
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | null;
    textAlign?: string | null;
    verticalAlign?: string | null;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

const margins = {
  h1: [8, 12],
  h2: [6, 8],
  h3: [5, 6],
  h4: [4, 5],
  h5: [3, 4],
  h6: [2, 3],
};

const getMargin = (
  level: NonNullable<TitleBlockProps["data"]["level"]>,
  verticalAlign: NonNullable<TitleBlockProps["data"]["verticalAlign"]>
) => {
  const margin = margins[level] || [6, 8];

  if (verticalAlign === "items-center") {
    return `my-${margin[0] / 2} md:my-${margin[1] / 2}`;
  } else if (verticalAlign === "items-end") {
    return `mt-${margin[0]} md:mt-${margin[1]}`;
  } else {
    return `mb-${margin[0]} md:mb-${margin[1]}`;
  }
};

const levelClasses: Record<
  NonNullable<TitleBlockProps["data"]["level"]>,
  string
> = {
  h1: `text-4xl md:text-5xl font-bold`,
  h2: `text-3xl md:text-4xl font-semibold`,
  h3: `text-2xl md:text-3xl font-semibold`,
  h4: `text-xl md:text-2xl font-medium`,
  h5: `text-lg md:text-xl font-medium`,
  h6: `text-base md:text-lg font-normal`,
};

const levelMarginClasses: Record<
  NonNullable<TitleBlockProps["data"]["level"]>,
  Record<string, string>
> = {
  h1: {
    "items-start": "mb-8 md:mb-12",
    "items-center": "my-4 md:my-6",
    "items-end": "mt-8 md:mt-12",
  },
  h2: {
    "items-start": "mb-6 md:mb-8",
    "items-center": "my-3 md:my-4",
    "items-end": "mt-6 md:mt-8",
  },
  h3: {
    "items-start": "mb-5 md:mb-6",
    "items-center": "my-2.5 md:my-3",
    "items-end": "mt-5 md:mt-6",
  },
  h4: {
    "items-start": "mb-4 md:mb-5",
    "items-center": "my-2 md:my-2.5",
    "items-end": "mt-4 md:mt-5",
  },
  h5: {
    "items-start": "mb-3 md:mb-4",
    "items-center": "my-1.5 md:my-2",
    "items-end": "mt-3 md:mt-4",
  },
  h6: {
    "items-start": "mb-2 md:mb-3",
    "items-center": "my-1 md:my-1.5",
    "items-end": "mt-2 md:mt-3",
  },
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
    <div className="w-full">
      <div
        className={`max-w-4xl mx-auto ${textAlign.replace("text-", "text-")}`}
      >
        {title && (
          <HeadingTag
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: motionDelay, duration: 0.8 }}
            className={
              levelClasses[level || "h2"] +
              " " +
              levelMarginClasses[level || "h2"][
                data.verticalAlign || "items-center"
              ]
            }
            data-tina-field={dataTinaField}
          >
            {title}
          </HeadingTag>
        )}
      </div>
    </div>
  );
}
