import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import React from "react";

interface TinaMarkdownRendererProps {
  content: any;
  className?: string;
}

/**
 * Reusable TinaMarkdown component with styled elements.
 * Renders markdown with custom styling for strong elements using the primary color.
 */
const tinaMarkdownComponents: Record<string, React.ComponentType<any>> = {
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  code_block: ({ value, lang }: { value: string; lang?: string }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code>{value}</code>
    </pre>
  ),
  code: ({ value }: { value: string }) => (
    <code className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-xs font-mono">
      {value}
    </code>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-primary hover:underline hover:text-primary/80"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700">
      {children}
    </blockquote>
  ),
  img: ({ url, alt }: { url?: string; alt?: string }) => (
    <img src={url} alt={alt} className="max-w-full h-auto rounded-lg" />
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-gray-300 px-4 py-2">{children}</td>
  ),
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mb-3">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold mb-2">{children}</h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-bold mb-2">{children}</h4>
  ),
  h5: ({ children }: { children: React.ReactNode }) => (
    <h5 className="text-lg font-bold mb-1">{children}</h5>
  ),
  h6: ({ children }: { children: React.ReactNode }) => (
    <h6 className="text-base font-bold mb-1">{children}</h6>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-1">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  bold: ({ children }: { children: string }) => {
    return <strong className="text-primary font-semibold">{children}</strong>;
  },
};

export function TinaMarkdownRenderer({
  content,
  className,
}: TinaMarkdownRendererProps) {
  return (
    <div className={className}>
      <TinaMarkdown content={content} components={tinaMarkdownComponents} />
    </div>
  );
}
