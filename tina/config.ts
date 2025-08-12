import { defineConfig } from "tinacms";
import { pageBlockTemplates } from "../src/components/blocks/templates";
import { 
  layoutHeaderBlockTemplates, 
  layoutChildrenBlockTemplates, 
  layoutFooterBlockTemplates 
} from "../src/components/blocks/layout-blocks";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Helper function to create fields based on filename
const createConditionalFields = () => {
  const baseFields = [
    {
      type: "string" as const,
      name: "title",
      label: "Page Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string" as const,
      name: "description",
      label: "Meta Description",
      description: "SEO description for this page",
    },
    {
      type: "object" as const,
      name: "seo",
      label: "SEO Settings",
      fields: [
        {
          type: "string" as const,
          name: "metaTitle",
          label: "Meta Title",
          description: "Override the page title for SEO",
        },
        {
          type: "string" as const,
          name: "metaDescription",
          label: "Meta Description",
          description: "SEO meta description",
        },
        {
          type: "string" as const,
          name: "canonicalUrl",
          label: "Canonical URL",
          description: "Canonical URL for this page",
        },
      ],
    },
  ];

  const pageFields = [
    {
      type: "object" as const,
      name: "blocks",
      label: "Page Blocks",
      list: true,
      templates: pageBlockTemplates,
    },
  ];

  const layoutFields = [
    {
      type: "object" as const,
      name: "headerBlocks",
      label: "Header Blocks",
      description: "Optional header components for the layout",
      list: true,
      templates: layoutHeaderBlockTemplates,
    },
    {
      type: "object" as const,
      name: "childrenBlocks",
      label: "Main Content Blocks",
      description: "Main content area - must include exactly one children block",
      list: true,
      templates: [...layoutChildrenBlockTemplates, ...pageBlockTemplates],
      ui: {
        validate: (value: any[]) => {
          if (!value || value.length === 0) {
            return "At least one main content block is required";
          }
          
          // Count children blocks (from layoutChildrenBlockTemplates)
          const childrenBlocks = value.filter((block: any) => 
            layoutChildrenBlockTemplates.some(template => 
              template.name === block._template
            )
          );
          
          if (childrenBlocks.length === 0) {
            return "Exactly one children block is required for layouts";
          }
          if (childrenBlocks.length > 1) {
            return "Only one children block is allowed per layout";
          }
          
          return undefined;
        }
      }
    },
    {
      type: "object" as const,
      name: "footerBlocks",
      label: "Footer Blocks",
      description: "Optional footer components for the layout",
      list: true,
      templates: layoutFooterBlockTemplates,
    },
  ];

  return { baseFields, pageFields, layoutFields };
};

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        match: {
          include: "**/page",
        },
        fields: [
          ...createConditionalFields().baseFields,
          ...createConditionalFields().pageFields,
        ],
        ui: {
          router: ({ document }) => {
            console.log("Routing document:", {
              filename: document._sys.filename,
              path: document._sys.path,
              title: document._sys.title,
              breadcrumbs: document._sys.breadcrumbs,
            });
            
            // Get breadcrumbs and remove the last element (which is always "page")
            const breadcrumbs = document._sys.breadcrumbs;
            const routeParts = breadcrumbs.slice(0, -1); // Remove "page" from the end
            
            // Handle root page (breadcrumbs: ["page"])
            if (routeParts.length === 0) {
              return "/";
            }
            
            // Handle nested pages - construct path from breadcrumbs
            return `/${routeParts.join("/")}`;
          },
          filename: {
            // Force filename to be "page" for all pages
            slugify: () => "page",
          },
        },
      },
      {
        name: "layouts",
        label: "Layouts",
        path: "content/pages",
        format: "mdx",
        match: {
          include: "**/layout",
        },
        fields: [
          ...createConditionalFields().baseFields,
          ...createConditionalFields().layoutFields,
        ],
        ui: {
          router: ({ document }) => {
            console.log("Routing layout document:", {
              filename: document._sys.filename,
              path: document._sys.path,
              title: document._sys.title,
              breadcrumbs: document._sys.breadcrumbs,
            });
            
            // Get breadcrumbs and remove the last element (which is always "layout")
            const breadcrumbs = document._sys.breadcrumbs;
            const routeParts = breadcrumbs.slice(0, -1); // Remove "layout" from the end
            
            // Handle root layout (breadcrumbs: ["layout"])
            if (routeParts.length === 0) {
              return "/";
            }
            
            // Handle nested layouts - construct path from breadcrumbs
            return `/${routeParts.join("/")}`;
          },
          filename: {
            // Force filename to be "layout" for all layouts
            slugify: () => "layout",
          },
        },
      },
    ],
  },
});
