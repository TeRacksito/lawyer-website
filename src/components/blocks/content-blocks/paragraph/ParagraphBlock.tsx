import { TinaMarkdown } from "tinacms/dist/rich-text";

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
    <div
      className={`${
        data.proseSize ? data.proseSize : "prose-lg"
      } max-w-4xl mx-auto ${data.textAlign ? data.textAlign : ""}`}
      data-tina-field={dataTinaField}
    >
      <TinaMarkdown content={data.text} />
    </div>
  );
}
