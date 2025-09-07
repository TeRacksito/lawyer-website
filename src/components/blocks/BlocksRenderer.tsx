"use client";

import { tinaField } from "tinacms/dist/react";

interface BlockRendererProps {
  blocks?: any[];
  components: Record<
    string,
    React.ComponentType<{ data: any; dataTinaField?: string }>
  >;
  parentData?: any;
  blocksFieldName?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Generic block renderer component that can render any collection of blocks
 * using a provided component registry. This enables recursive block rendering
 * where blocks can contain other blocks.
 *
 * @param blocks - Array of block data objects
 * @param components - Registry mapping template names to React components
 * @param parentData - Parent data object for Tina field binding
 * @param blocksFieldName - Name of the blocks field in parent data (default: "blocks")
 * @param className - Optional CSS class for the container
 * @param children - Optional fallback content when no blocks are present
 */
export default function BlockRenderer({
  blocks = [],
  components,
  parentData,
  blocksFieldName = "blocks",
  className,
  children,
}: BlockRendererProps) {
  // If no blocks are provided, render children or nothing
  if (!blocks || blocks.length === 0) {
    return children ? <div className={className}>{children}</div> : null;
  }

  return (
    <div className={className}>
      {blocks.map((block: any, index: number) => {
        // Extract template name from __typename (e.g., "PagesBlocksHero" -> "hero")
        // Also handle direct template names
        const templateName = block.__typename
          ? block.__typename.replace(/.*Blocks/, "").toLowerCase()
          : block._template;

        const BlockComponent = components[templateName];

        if (!BlockComponent) {
          console.warn(
            `No component found for block type: ${
              block.__typename || block._template
            } (mapped to: ${templateName})`
          );
          console.warn("Available components:", Object.keys(components));
          return null;
        }

        // Create Tina field binding if parent data is provided
        const tinaFieldProps = parentData
          ? {
              "data-tina-field": tinaField(
                parentData,
                `${blocksFieldName}.${index}`
              ),
            }
          : {};

        return (
          <div key={index} {...tinaFieldProps}>
            <BlockComponent
              data={block}
              dataTinaField={
                parentData
                  ? tinaField(parentData, `${blocksFieldName}.${index}`)
                  : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
}
