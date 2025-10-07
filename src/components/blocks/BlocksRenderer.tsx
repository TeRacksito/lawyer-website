"use client";

import { tinaField } from "tinacms/dist/react";

interface BlockRendererProps {
  blocks?: any[];
  components: Record<
    string,
    React.ComponentType<{
      data: any;
      dataTinaField?: string;
      motionDelay?: number;
    }>
  >;
  parentData?: any;
  blocksFieldName?: string;
  className?: string;
  children?: React.ReactNode;
  previousDelay?: number;
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
  previousDelay = 0,
}: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return children ? <div className={className}>{children}</div> : null;
  }

  const startDelay = 0.1 + previousDelay;
  const maxDelay = 0.5;
  const delayIncrement =
    blocks.length > 1 ? (maxDelay - startDelay) / (blocks.length - 1) : 0;

  return (
    <div className={className}>
      {blocks.map((block: any, index: number) => {
        const templateName = (() => {
          const tn = block.__typename;
          if (typeof tn === "string") {
            let idx = -1;
            for (let i = tn.length - 1; i >= 0; i--) {
              if (/[A-Z]/.test(tn[i])) {
                idx = i;
                break;
              }
            }
            if (idx !== -1) {
              return tn.slice(idx).toLowerCase();
            }
          }
          return block._template || "";
        })();

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

        return (
          <div key={index}>
            <BlockComponent
              data={block}
              dataTinaField={
                parentData
                  ? tinaField(parentData, `${blocksFieldName}.${index}`)
                  : undefined
              }
              motionDelay={startDelay + index * delayIncrement}
            />
          </div>
        );
      })}
    </div>
  );
}
