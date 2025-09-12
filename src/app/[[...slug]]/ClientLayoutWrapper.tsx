"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import {
  pageBlockComponents,
  layoutHeaderBlockComponents,
  layoutChildrenBlockComponents,
  layoutFooterBlockComponents,
} from "../../components/blocks/templates";
import { ReactNode } from "react";

interface ClientLayoutWrapperProps {
  query?: string;
  variables?: object;
  data?: any;
  children: ReactNode;
}

export default function ClientLayoutWrapper({
  query,
  variables,
  data,
  children,
}: ClientLayoutWrapperProps) {
  // If we have Tina data, use contextual editing
  if (query && variables && data) {
    const { data: tinaData } = useTina({
      query,
      variables,
      data,
    });

    // This wrapper only handles layouts collection
    const layoutData = tinaData.layouts;

    if (!layoutData) {
      console.warn("No layout data found in Tina response");
      return <div>{children}</div>;
    }

    // Handle layout structure with separate block arrays
    const headerBlocks = layoutData.headerBlocks || [];
    const childrenBlocks = layoutData.childrenBlocks || [];
    const footerBlocks = layoutData.footerBlocks || [];

    const renderHeaderBlock = (block: any, index: number) => {
      const templateName =
        block._template ||
        block.__typename?.replace("LayoutsHeaderBlocks", "").toLowerCase();
      const BlockComponent = layoutHeaderBlockComponents[templateName];

      if (!BlockComponent) {
        console.warn(
          `No header component found for block type: ${templateName}`
        );
        return null;
      }

      return (
        <BlockComponent
          key={index}
          data={block}
          dataTinaField={tinaField(layoutData, `headerBlocks.${index}`)}
        />
      );
    };

    const renderChildrenBlock = (block: any, index: number) => {
      const templateName =
        block._template ||
        block.__typename?.replace("LayoutsChildrenBlocks", "").toLowerCase();

      // Check if it's a children block (layout component) or page block
      let BlockComponent =
        layoutChildrenBlockComponents[templateName] ||
        pageBlockComponents[templateName];

      if (!BlockComponent) {
        console.warn(
          `No children component found for block type: ${templateName}`
        );
        return null;
      }

      // If it's a children/main block, pass the children prop
      const isChildrenBlock = layoutChildrenBlockComponents[templateName];

      if (isChildrenBlock) {
        const ChildrenComponent = BlockComponent as React.ComponentType<{
          data: any;
          children: ReactNode;
        }>;
        return (
          <div
            key={index}
            // data-tina-field={tinaField(layoutData, `childrenBlocks.${index}`)}
          >
            <ChildrenComponent data={block}>{children}</ChildrenComponent>
          </div>
        );
      } else {
        // Regular page block in the children area
        return (
          <div
            key={index}
            // data-tina-field={tinaField(layoutData, `childrenBlocks.${index}`)}
          >
            <BlockComponent data={block} />
          </div>
        );
      }
    };

    const renderFooterBlock = (block: any, index: number) => {
      const templateName =
        block._template ||
        block.__typename?.replace("LayoutsFooterBlocks", "").toLowerCase();
      const BlockComponent = layoutFooterBlockComponents[templateName];

      if (!BlockComponent) {
        console.warn(
          `No footer component found for block type: ${templateName}`
        );
        return null;
      }

      return (
        <div
          key={index}
          data-tina-field={tinaField(layoutData, `footerBlocks.${index}`)}
        >
          <BlockComponent data={block} />
        </div>
      );
    };

    return (
      <div className="min-h-screen flex flex-col">
        {/* Render header blocks */}
        {headerBlocks.map((block: any, index: number) =>
          renderHeaderBlock(block, index)
        )}

        {/* Render children blocks - must include exactly one children/main block */}
        {childrenBlocks.length > 0 ? (
          childrenBlocks.map((block: any, index: number) =>
            renderChildrenBlock(block, index)
          )
        ) : (
          // Fallback if no children blocks configured
          <main className="flex-1">{children}</main>
        )}

        {/* Render footer blocks */}
        {footerBlocks.map((block: any, index: number) =>
          renderFooterBlock(block, index)
        )}
      </div>
    );
  }

  // Fallback when no Tina data
  return (
    <div>
      This page doesn't have a layout!
      <br />
      {children}
    </div>
  );
}
