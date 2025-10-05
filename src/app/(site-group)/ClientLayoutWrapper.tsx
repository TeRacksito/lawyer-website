"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import {
  pageBlockComponents,
  layoutHeaderBlockComponents,
  layoutFooterBlockComponents,
} from "../../components/blocks/templates";
import MainBlock from "../../components/blocks/layout-blocks/main/MainBlock";
import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";

interface LayoutData {
  path: string;
  query: string;
  variables: object;
  data: any;
}

interface ClientLayoutWrapperProps {
  availableLayouts: LayoutData[];
  children: ReactNode;
}

export default function ClientLayoutWrapper({
  availableLayouts,
  children,
}: ClientLayoutWrapperProps) {
  const pathname = usePathname();

  // Determine which layouts apply to the current pathname
  const applicableLayouts = useMemo(() => {
    // Remove leading slash and split into segments
    const pathSegments = pathname.replace(/^\//, "").split("/").filter(Boolean);

    // Find all layouts that match the current path hierarchy
    const layouts: LayoutData[] = [];

    // Check for root layout
    const rootLayout = availableLayouts.find((layout) => layout.path === "");
    if (rootLayout) {
      layouts.push(rootLayout);
    }

    // Check for nested layouts matching path segments
    for (let i = 1; i <= pathSegments.length; i++) {
      const currentPath = pathSegments.slice(0, i).join("/");
      const matchingLayout = availableLayouts.find(
        (layout) => layout.path === currentPath
      );
      if (matchingLayout) {
        layouts.push(matchingLayout);
      }
    }

    return layouts;
  }, [pathname, availableLayouts]);

  // If no layouts apply, show fallback
  if (applicableLayouts.length === 0) {
    return (
      <div>
        This page doesn't have a layout!
        <br />
        {children}
      </div>
    );
  }

  // Recursively render nested layouts
  const renderNestedLayouts = (
    layouts: LayoutData[],
    content: ReactNode,
    index = 0
  ): ReactNode => {
    // Base case: no more layouts, return content
    if (index >= layouts.length) {
      return content;
    }

    const currentLayout = layouts[index];
    const nextContent = renderNestedLayouts(layouts, content, index + 1);

    return (
      <LayoutRenderer layout={currentLayout}>{nextContent}</LayoutRenderer>
    );
  };

  return <>{renderNestedLayouts(applicableLayouts, children)}</>;
}

// Separate component to handle individual layout rendering with Tina
function LayoutRenderer({
  layout,
  children,
}: {
  layout: LayoutData;
  children: ReactNode;
}) {
  const { data: tinaData } = useTina({
    query: layout.query,
    variables: layout.variables,
    data: layout.data,
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
      console.warn(`No header component found for block type: ${templateName}`);
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
      console.warn(`No footer component found for block type: ${templateName}`);
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
