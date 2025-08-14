import { tinaField } from "tinacms/dist/react";
import HeroTitle from "@/components/ui/banners/HeroTitle";

interface HeroTitleVariantProps {
  data: {
    title?: string | null;
    subtitle?: string | null;
  };
}

export default function HeroTitleVariant({ data }: HeroTitleVariantProps) {
  const { title, subtitle } = data;

  if (!title || !subtitle) {
    return (
      <div>
        {title && (
          <h1 
            className="text-4xl lg:text-6xl font-bold mb-6"
            data-tina-field={tinaField(data, "title")}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p 
            className="text-xl lg:text-2xl mb-8 text-gray-200"
            data-tina-field={tinaField(data, "subtitle")}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <HeroTitle
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
}
