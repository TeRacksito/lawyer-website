"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import {
  pageBlockComponents,
  layoutHeaderBlockComponents,
  layoutFooterBlockComponents,
} from "../../components/blocks/templates";
import MainBlock from "../../components/blocks/layout-blocks/main/MainBlock";
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
    const footerBlocks = layoutData.footerBlocks || [];

    const renderHeaderBlock = (block: any, index: number) => {
      const templateName =
        block._template ||
        block.__typename?.replace("LayoutsHeaderBlocks", "").toLowerCase();

      // Try layout header components first, then page components
      const BlockComponent =
        layoutHeaderBlockComponents[templateName] ||
        pageBlockComponents[templateName];

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

    const renderMainBlock = () => {
      const mainData = layoutData.main;

      if (!mainData) {
        // Fallback if no main block is configured
        return <main className="flex-1">{children}</main>;
      }

      return <MainBlock data={mainData}>{children}</MainBlock>;
    };

    const renderFooterBlock = (block: any, index: number) => {
      const templateName =
        block._template ||
        block.__typename?.replace("LayoutsFooterBlocks", "").toLowerCase();

      // Try layout footer components first, then page components
      const BlockComponent =
        layoutFooterBlockComponents[templateName] ||
        pageBlockComponents[templateName];

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

        {/* Render main block */}
        {renderMainBlock()}

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
