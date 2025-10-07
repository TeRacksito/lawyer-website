import { tinaField } from "tinacms/dist/react";
import { ReactNode } from "react";

interface MainBlockProps {
  data: {
    containerType?: string | null;
    padding?: string | null;
    backgroundColor?: string | null;
    minHeight?: string | null;
  };
  children: ReactNode;
}

export default function MainBlock({ data, children }: MainBlockProps) {
  const {
    containerType = "container",
    padding = "medium",
    backgroundColor = "white",
    minHeight = "auto",
  } = data;

  const getContainerClasses = () => {
    switch (containerType) {
      case "full":
        return "w-full";
      case "narrow":
        return "container mx-auto max-w-4xl px-4";
      default:
        return "container mx-auto px-4";
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case "none":
        return "";
      case "small":
        return "py-4";
      case "large":
        return "py-16";
      default:
        return "py-8";
    }
  };

  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case "gray-light":
        return "bg-gray-50";
      case "gray":
        return "bg-gray-100";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-white";
    }
  };

  const getMinHeightClasses = () => {
    switch (minHeight) {
      case "screen":
        return "min-h-screen";
      case "half-screen":
        return "min-h-[50vh]";
      default:
        return "flex-1";
    }
  };

  return (
    <main
      className={`
        ${getBackgroundClasses()} 
        ${getMinHeightClasses()} 
        ${getPaddingClasses()}
      `.trim()}
    >
      <div className={getContainerClasses()}>{children}</div>
    </main>
  );
}
