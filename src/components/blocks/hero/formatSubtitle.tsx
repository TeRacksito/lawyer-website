export function formatSubtitle(
  subtitle: string,
  authorName?: string | null,
  dataTinaField?: string | null
): React.ReactNode {
  if (!authorName) {
    return <span>{subtitle}</span>;
  }

  const parts = subtitle.split(authorName);

  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && (
        <strong
          className="text-primary font-bold"
          {...(dataTinaField ? { "data-tina-field": dataTinaField } : {})}
        >
          {authorName}
        </strong>
      )}
    </span>
  ));
}
