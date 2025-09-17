import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion } from "framer-motion";

interface ParagraphBlockProps {
  data: {
    text?: any | null;
    textAlign?: string | null;
    proseSize?: string | null;
  };
  dataTinaField?: string;
}

export default function ParagraphBlock({
  data,
  dataTinaField,
}: ParagraphBlockProps) {
  console.log(data.text);

  return (
    <motion.div
      className={`${
        data.proseSize ? data.proseSize : "prose-lg"
      } max-w-4xl mx-auto m-3 ${data.textAlign ? data.textAlign : ""}`}
      data-tina-field={dataTinaField}
    >
      <TinaMarkdown content={data.text} />
    </motion.div>
  );
}
