import React, { Fragment } from "react";

interface FormattedTextProps {
  /**
   * The raw text to parse and render. Supports GitHub-flavored markdown-like formatting:
   * - **bold** or __bold__
   * - *italic* or _italic_
   * - `code`
   * - ~~strikethrough~~
   * - ==underline== (custom styled underline)
   * - [link text](url)
   */
  text: string;
}

type TextElement = {
  type:
    | "text"
    | "bold"
    | "italic"
    | "code"
    | "strikethrough"
    | "underline"
    | "link";
  content: string;
  url?: string;
};

/**
 * Parses text for GitHub-flavored markdown-like formatting and renders it with appropriate styling.
 * Supports: **bold**, *italic*, `code`, ~~strikethrough~~, ==underline==, and [links](url).
 * Escaped characters (e.g., \* \_ \` \~ \= \[) are rendered literally.
 *
 * Example text:
 * `Welcome to our **Law Firm**!\n\nWe provide *exceptional* legal services with ==guaranteed results==.\n\nOur expertise includes:\n• **Criminal Defense** - Protecting your rights\n• *Family Law* - Compassionate representation\n• ==Corporate Law== - Strategic business solutions\n\nContact us at our office or visit [our website](https://example.com) for more information.\n\nWe have ~~30~~ **50 years** of combined experience!\n\nUse code \`LAW2024\` for a free consultation.\n\n**Bold and *italic combined*** for emphasis!\nYou can also escape characters: \\*not bold\\* \\==not underlined\\==`
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const parseText = (input: string): TextElement[] => {
    const elements: TextElement[] = [];
    let remaining = input;

    const patterns = [
      { regex: /\\\[/g, type: "escape" as const },
      { regex: /\\\]/g, type: "escape" as const },
      { regex: /\\\*/g, type: "escape" as const },
      { regex: /\\_/g, type: "escape" as const },
      { regex: /\\`/g, type: "escape" as const },
      { regex: /\\~/g, type: "escape" as const },
      { regex: /\\=/g, type: "escape" as const },
    ];

    for (const pattern of patterns) {
      remaining = remaining.replace(
        pattern.regex,
        (match) => `\\x${match.charCodeAt(1).toString(16)}`
      );
    }   

    const regex =
      /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|~~([^~]+)~~|==([^=]+)==|`([^`]+)`|\*([^*]+)\*|_([^_]+)_/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        const textContent = remaining.substring(lastIndex, match.index);
        if (textContent) {
          elements.push({ type: "text", content: textContent });
        }
      }

      const [
        ,
        linkText,
        linkUrl,
        bold1,
        bold2,
        strikethrough,
        underline,
        code,
        italic1,
        italic2,
      ] = match;

      if (linkText && linkUrl) {
        elements.push({ type: "link", content: linkText, url: linkUrl });
      } else if (bold1) {
        elements.push({ type: "bold", content: bold1 });
      } else if (bold2) {
        elements.push({ type: "bold", content: bold2 });
      } else if (strikethrough) {
        elements.push({ type: "strikethrough", content: strikethrough });
      } else if (underline) {
        elements.push({ type: "underline", content: underline });
      } else if (code) {
        elements.push({ type: "code", content: code });
      } else if (italic1) {
        elements.push({ type: "italic", content: italic1 });
      } else if (italic2) {
        elements.push({ type: "italic", content: italic2 });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < remaining.length) {
      const textContent = remaining.substring(lastIndex);
      if (textContent) {
        elements.push({ type: "text", content: textContent });
      }
    }

    return elements.map((el) => ({
      ...el,
      content: el.content.replace(/\\x([0-9a-f]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      ),
    }));
  };

  const renderElement = (
    element: TextElement,
    key: number
  ): React.ReactNode => {
    const renderTextWithBreaks = (text: string) => {
      const parts = text.split("\\n");
      return parts.map((part, idx) => (
        <Fragment key={idx}>
          {part}
          {idx < parts.length - 1 && <br />}
        </Fragment>
      ));
    };

    switch (element.type) {
      case "bold":
        return (
          <strong key={key} className="font-semibold">
            {renderTextWithBreaks(element.content)}
          </strong>
        );
      case "italic":
        return (
          <em key={key} className="italic">
            {renderTextWithBreaks(element.content)}
          </em>
        );
      case "code":
        return (
          <code
            key={key}
            className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-xs font-mono"
          >
            {element.content}
          </code>
        );
      case "strikethrough":
        return (
          <s key={key} className="line-through">
            {renderTextWithBreaks(element.content)}
          </s>
        );
      case "underline":
        return (
          <span
            key={key}
            className="relative inline-block"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, transparent 100%)",
              backgroundPosition: "0 100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 3px",
              borderBottom: "2px solid transparent",
              borderImage:
                "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
              borderImageSlice: 1,
              paddingBottom: "2px",
            }}
          >
            {renderTextWithBreaks(element.content)}
          </span>
        );
      case "link":
        return (
          <a
            key={key}
            href={element.url}
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {renderTextWithBreaks(element.content)}
          </a>
        );
      case "text":
      default:
        return (
          <Fragment key={key}>{renderTextWithBreaks(element.content)}</Fragment>
        );
    }
  };

  const elements = parseText(text);

  return (
    <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm">
      {elements.map((el, idx) => renderElement(el, idx))}
    </p>
  );
};
