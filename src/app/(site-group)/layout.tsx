import { client } from "../../../tina/__generated__/client";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

export interface IDynamicLayoutProps {
  children: React.ReactNode;
}

/**
 * Similar to generateStaticParams for pages, this function fetches all available layouts
 * from TinaCMS and prepares their data for use in the ClientLayoutWrapper.
 * @returns Array of layout data including path, query, variables, and data.
 */
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
  const availableLayouts = await getAllAvailableLayouts();

  return (
    <ClientLayoutWrapper availableLayouts={availableLayouts}>
      {props.children}
    </ClientLayoutWrapper>
  );
}
