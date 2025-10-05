import { client } from "../../../tina/__generated__/client";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

export interface IDynamicLayoutProps {
  children: React.ReactNode;
}

// Get all available layouts and prepare them for client-side routing
async function getAllAvailableLayouts() {
  try {
    const layouts = await client.queries.layoutsConnection();

    if (!layouts.data.layoutsConnection.edges) {
      return [];
    }

    const layoutDataPromises = layouts.data.layoutsConnection.edges.map(
      async (layout) => {
        const relativePath = layout?.node?._sys.relativePath;
        if (!relativePath || !relativePath.endsWith("layout.mdx")) {
          return null;
        }

        // Extract path from relativePath: about/layout.mdx -> "about"
        let path = "";
        if (relativePath !== "layout.mdx") {
          const pathParts = relativePath.split("/");
          path = pathParts.slice(0, -1).join("/");
        }

        try {
          const layoutData = await client.queries.layouts({
            relativePath,
          });

          return {
            path,
            query: layoutData.query,
            variables: layoutData.variables,
            data: layoutData.data,
          };
        } catch (error) {
          console.error(`Error loading layout ${relativePath}:`, error);
          return null;
        }
      }
    );

    const allLayouts = await Promise.all(layoutDataPromises);
    return allLayouts.filter((layout) => layout !== null);
  } catch (error) {
    console.error("Error loading layouts:", error);
    return [];
  }
}

export default async function DynamicLayout(props: IDynamicLayoutProps) {
  // Get all available layouts at build time
  const availableLayouts = await getAllAvailableLayouts();

  // Pass all layout data to client component for pathname-based routing
  return (
    <ClientLayoutWrapper availableLayouts={availableLayouts}>
      {props.children}
    </ClientLayoutWrapper>
  );
}
