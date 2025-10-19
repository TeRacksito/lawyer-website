"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import MainBlock from "../../components/blocks/layout-blocks/main/MainBlock";
import {
  layoutHeaderBlockComponents,
  layoutFooterBlockComponents,
} from "@/components/blocks/layout-blocks";
import { sectionBlockComponents } from "@/components/blocks/section-blocks";

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

  const applicableLayouts = useMemo(() => {
    // remove leading slash and split into segments
    const pathSegments = pathname.replace(/^\//, "").split("/").filter(Boolean);

    const layouts: LayoutData[] = [];

    const rootLayout = availableLayouts.find((layout) => layout.path === "");
    if (rootLayout) {
      layouts.push(rootLayout);
    }

    // check for nested layouts matching path segments
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

  // fallback
  if (applicableLayouts.length === 0) {
    return (
      <div>
        This page doesn't have a layout!
        <br />
        {children}
      </div>
    );
  }

  const renderNestedLayouts = (
    layouts: LayoutData[],
    content: ReactNode,
    index = 0
  ): ReactNode => {
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

  const layoutData = tinaData.layouts;

  if (!layoutData) {
    console.warn("No layout data found in Tina response");
    return <div>{children}</div>;
  }

  const headerBlocks = layoutData.headerBlocks || [];
  const footerBlocks = layoutData.footerBlocks || [];

  const renderHeaderBlock = (block: any, index: number) => {
    const templateName =
      block._template ||
      block.__typename?.replace("LayoutsHeaderBlocks", "").toLowerCase();

    const BlockComponent =
      layoutHeaderBlockComponents[templateName] ||
      sectionBlockComponents[templateName];

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
      return <main className="flex-1">{children}</main>;
    }

    return <MainBlock data={mainData}>{children}</MainBlock>;
  };

  const renderFooterBlock = (block: any, index: number) => {
    const templateName =
      block._template ||
      block.__typename?.replace("LayoutsFooterBlocks", "").toLowerCase();

    const BlockComponent =
      layoutFooterBlockComponents[templateName] ||
      sectionBlockComponents[templateName];

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
      {headerBlocks.map((block: any, index: number) =>
        renderHeaderBlock(block, index)
      )}

      {renderMainBlock()}

      {footerBlocks.map((block: any, index: number) =>
        renderFooterBlock(block, index)
      )}
    </div>
  );
}
