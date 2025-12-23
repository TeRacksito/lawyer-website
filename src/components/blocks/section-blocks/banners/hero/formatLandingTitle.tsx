import { ReactNode } from "react";

/**
 * Formats the landing page title with support for:
 * - `\n` for line breaks
 * - `**text**` for bold text with blue gradient
 */
export function formatLandingTitle(title: string): ReactNode {
  const lines = title.split("\\n");

  return lines.map((line, lineIndex) => {
    const parts: ReactNode[] = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lineIndex}-${lastIndex}`}>
            {line.slice(lastIndex, match.index)}
          </span>
        );
      }

      parts.push(
        <strong
          key={`bold-${lineIndex}-${match.index}`}
          className="font-extrabold bg-linear-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient"
        >
          {match[1]}
        </strong>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      parts.push(
        <span key={`text-${lineIndex}-${lastIndex}`}>
          {line.slice(lastIndex)}
        </span>
      );
    }

    return (
      <span key={lineIndex} className="block">
        {parts}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}
