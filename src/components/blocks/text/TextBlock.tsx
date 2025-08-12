import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";

interface TextBlockProps {
  data: {
    title?: string | null;
    text?: any;
    alignment?: string | null;
    size?: string | null;
  };
}

export default function TextBlock({ data }: TextBlockProps) {
  const { title, text, alignment = "left", size = "medium" } = data;

  const getAlignmentClasses = () => {
    switch (alignment) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "prose-sm";
      case "large":
        return "prose-lg";
      default:
        return "prose";
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto ${getAlignmentClasses()}`}>
          {title && (
            <h2 
              className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6"
              data-tina-field={tinaField(data, "title")}
            >
              {title}
            </h2>
          )}
          
          {text && (
            <div 
              className={`${getSizeClasses()} max-w-none`}
              data-tina-field={tinaField(data, "text")}
            >
              <TinaMarkdown content={text} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
