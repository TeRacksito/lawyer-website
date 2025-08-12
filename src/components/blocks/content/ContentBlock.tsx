import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";

interface ContentBlockProps {
  data: {
    title?: string | null;
    content?: any;
    layout?: string | null;
  };
}

export default function ContentBlock({ data }: ContentBlockProps) {
  const { title, content, layout = "single-column" } = data;

  const getLayoutClasses = () => {
    switch (layout) {
      case "two-column":
        return "grid grid-cols-1 lg:grid-cols-2 gap-8";
      case "sidebar-left":
        return "grid grid-cols-1 lg:grid-cols-4 gap-8";
      case "sidebar-right":
        return "grid grid-cols-1 lg:grid-cols-4 gap-8";
      default:
        return "max-w-4xl mx-auto";
    }
  };

  const getContentClasses = () => {
    switch (layout) {
      case "sidebar-left":
        return "lg:col-span-3";
      case "sidebar-right":
        return "lg:col-span-3";
      default:
        return "";
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              data-tina-field={tinaField(data, "title")}
            >
              {title}
            </h2>
          </div>
        )}
        
        <div className={getLayoutClasses()}>
          {layout === "sidebar-left" && (
            <div className="lg:col-span-1">
              {/* Sidebar content - you can add sidebar components here */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                {/* Add sidebar navigation or related content */}
              </div>
            </div>
          )}
          
          <div className={getContentClasses()}>
            {content && (
              <div 
                className="prose prose-lg max-w-none"
                data-tina-field={tinaField(data, "content")}
              >
                <TinaMarkdown content={content} />
              </div>
            )}
          </div>
          
          {layout === "sidebar-right" && (
            <div className="lg:col-span-1">
              {/* Sidebar content - you can add sidebar components here */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Related Info</h3>
                {/* Add sidebar navigation or related content */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
