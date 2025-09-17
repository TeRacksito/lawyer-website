interface TitleBlockProps {
  data: {
    title?: string | null;
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | null;
  };
  dataTinaField?: string;
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

export default function TitleBlock({ data, dataTinaField }: TitleBlockProps) {
  const { title, level } = data;

  const HeadingTag = level || "h1";
5
  return (
    <div className="max-w-4xl mx-auto text-center">
      {title && (
        <HeadingTag
          className={levelClasses[HeadingTag]}
          data-tina-field={dataTinaField}
        >
          {title}
        </HeadingTag>
      )}
    </div>
  );
}
