import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion } from "framer-motion";

interface ParagraphBlockProps {
  data: {
    text?: any | null;
    textAlign?: string | null;
    proseSize?: string | null;
  };
  dataTinaField?: string;
  motionDelay?: number;
}

export default function ParagraphBlock({
  data,
  dataTinaField,
  motionDelay,
}: ParagraphBlockProps) {
  console.log("Paragraph: motionDelay", motionDelay);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: motionDelay, duration: 0.8 }}
      className={`${
        data.proseSize ? data.proseSize : "prose-lg"
      } max-w-4xl mx-auto m-3 ${data.textAlign ? data.textAlign : ""}`}
      data-tina-field={dataTinaField}
    >
      <TinaMarkdown content={data.text} />
    </motion.div>
  );
}
