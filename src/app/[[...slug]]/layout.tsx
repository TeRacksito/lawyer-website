import { client } from "../../../tina/__generated__/client";
import { ReactNode } from "react";
import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/classic/Header";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import ExitPreviewBanner from "@/components/ui/banners/ExitPreviewBanner";

export interface IDynamicLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug?: string[];
  }>;
}

// Generate static params for layout - this ensures the layout data is fetched at build time
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const layouts = await client.queries.layoutsConnection({
      filter: { draft: { eq: false } },
    });

    if (!layouts.data.layoutsConnection.edges) {
      return [];
    }

    const allPaths = new Set<string>();

    layouts.data.layoutsConnection.edges.forEach((layout) => {
      const relativePath = layout?.node?._sys.relativePath;
      if (!relativePath || !relativePath.endsWith("layout.mdx")) {
        return;
      }

      // Extract slug from relativePath: about/layout.mdx -> ["about"]
      let slugParts: string[] = [];
      if (relativePath !== "layout.mdx") {
        const pathParts = relativePath.split("/");
        slugParts = pathParts.slice(0, -1); // Remove 'layout.mdx' from the end
      }

      // Add all parent paths to ensure layout inheritance works
      // For example, if we have about/services/layout.mdx, we also need:
      // - [] (root)
      // - ["about"]
      // - ["about", "services"]
      for (let i = 0; i <= slugParts.length; i++) {
        const pathSlice = slugParts.slice(0, i);
        allPaths.add(JSON.stringify(pathSlice));
      }
    });

    const params = Array.from(allPaths).map((pathStr) => ({
      slug: JSON.parse(pathStr) as string[],
    }));

    console.log(
      `Generated ${params.length} static params for layouts:`,
      params
    );
    return params;
  } catch (error) {
    console.error("Error generating static params for layout:", error);
    return [];
  }
}

async function getLayoutData(slug?: string[]) {
  try {
    // Construct the correct layout path based on the slug
    const slugArray = slug || [];
    const path =
      slugArray.length > 0 ? `${slugArray.join("/")}/layout.mdx` : "layout.mdx";

    console.log(`Relative path for layout: ${path}`);

    const layoutData = await client.queries.layouts({
      relativePath: path,
    });
    return layoutData;
  } catch (error) {
    // If no layout page exists, return null
    console.log(
      `No custom layout found for path: ${slug?.join("/") || "root"}`
    );
    return null;
  }
}

// Get all layouts from root to the current route
async function getAllLayoutsInHierarchy(slug?: string[]): Promise<any[]> {
  const slugArray = slug || [];
  const layouts = [];

  // Start from root and go down to the specific route
  for (let i = 0; i <= slugArray.length; i++) {
    const currentSlug = slugArray.slice(0, i);
    const layoutData = await getLayoutData(
      currentSlug.length === 0 ? undefined : currentSlug
    );

    if (layoutData) {
      layouts.push({
        data: layoutData,
        path: currentSlug.length === 0 ? "root" : currentSlug.join("/"),
      });
    }
  }

  console.log(
    `Found ${layouts.length} layouts in hierarchy for route: ${
      slug?.join("/") || "root"
    }`
  );
  return layouts;
}

// Recursively render nested layouts
function renderNestedLayouts(
  layouts: any[],
  children: React.ReactNode,
  index = 0
): React.ReactNode {
  // Base case: no more layouts, return children
  if (index >= layouts.length) {
    return children;
  }

  const currentLayout = layouts[index];
  const nextChildren = renderNestedLayouts(layouts, children, index + 1);

  // Render current layout with nested children
  return (
    <ClientLayoutWrapper
      query={currentLayout.data.query}
      variables={currentLayout.data.variables}
      data={currentLayout.data.data}
    >
      {nextChildren}
    </ClientLayoutWrapper>
  );
}

export default async function DynamicLayout(props: IDynamicLayoutProps) {
  const { slug } = await props.params;

  // Get all layouts in the hierarchy from root to current route
  const layoutsHierarchy = await getAllLayoutsInHierarchy(slug);

  // If we have custom layouts, render them with inheritance
  if (layoutsHierarchy.length > 0) {
    return renderNestedLayouts(layoutsHierarchy, props.children);
  }

  // Fallback to default layout if no custom layouts exist
  return (
    <div className="min-h-screen flex flex-col">
      This is a default layout fallback.
      <Header />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
