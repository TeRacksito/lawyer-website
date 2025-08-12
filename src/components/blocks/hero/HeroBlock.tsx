import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import Link from "next/link";

interface HeroBlockProps {
  data: {
    title?: string | null;
    subtitle?: string | null;
    content?: any;
    backgroundImage?: string | null;
    cta?: {
      text?: string | null;
      link?: string | null;
      variant?: string | null;
    } | null;
  };
}

export default function HeroBlock({ data }: HeroBlockProps) {
  const { title, subtitle, content, backgroundImage, cta } = data;

  const getButtonClasses = (variant?: string | null) => {
    const baseClasses = "inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200";
    
    switch (variant) {
      case "secondary":
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`;
      case "outline":
        return `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
    }
  };

  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
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
          
          {content && (
            <div 
              className="prose prose-lg prose-invert max-w-none mb-8"
              data-tina-field={tinaField(data, "content")}
            >
              <TinaMarkdown content={content} />
            </div>
          )}
          
          {cta?.text && cta?.link && (
            <div className="mt-8" data-tina-field={tinaField(data, "cta")}>
              <Link
                href={cta.link}
                className={getButtonClasses(cta.variant)}
              >
                {cta.text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
