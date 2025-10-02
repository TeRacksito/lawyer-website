import { mainBlockTemplate } from "@/components/blocks/layout-blocks/main/main.template";
import { defineConfig, Template } from "tinacms";
import {
  layoutFooterBlockTemplates,
  layoutHeaderBlockTemplates,
} from "../src/components/blocks/layout-blocks";
import { pageBlockTemplates } from "../src/components/blocks/templates";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Helper function to create fields based on filename
const createConditionalFields = () => {
  const baseFields: Template["fields"] = [
    {
      type: "string",
      name: "title",
      label: "Page Title",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      name: "seo",
      label: "SEO Settings",
      fields: [
        {
          type: "string",
          name: "metaTitle",
          label: "Meta Title",
          description: "Override the page title for SEO",
        },
        {
          type: "string",
          name: "metaDescription",
          label: "Meta Description",
          description: "SEO meta description",
        },
        {
          type: "string",
          name: "canonicalUrl",
          label: "Canonical URL",
          description: "Canonical URL for this page",
        },
      ],
    },
  ];

  const pageFields: Template["fields"] = [
    {
      type: "object",
      name: "blocks",
      label: "Page Blocks",
      list: true,
      templates: pageBlockTemplates,
    },
  ];

  const layoutFields: Template["fields"] = [
    {
      type: "object",
      name: "headerBlocks",
      label: "Header Blocks",
      description: "Optional header components for the layout",
      list: true,
      templates: [...layoutHeaderBlockTemplates, ...pageBlockTemplates],
    },
    { type: "object", ...mainBlockTemplate },
    {
      type: "object",
      name: "footerBlocks",
      label: "Footer Blocks",
      description: "Optional footer components for the layout",
      list: true,
      templates: [...layoutFooterBlockTemplates, ...pageBlockTemplates],
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

  admin: {
    authHooks: {
      onLogin: async ({ token }) => {
        //  When the user logs in enter preview mode
        location.href =
          `/api/draft/enter?token=${token.id_token}&slug=` + location;
      },
      onLogout: async () => {
        // When the user logs out exit preview mode
        location.href = `/api/draft/exit?slug=` + location;
      },
    },
  },

  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        defaultItem: {
          title: "Nueva Página",
          draft: false,
          blocks: [
            {
              _template: "hero",
              variant: "heroTitle",
              fullScreen: false,
              yShift: 50,
              title: "Título Principal",
              subtitle:
                "Subtítulo descriptivo que acompaña al título principal",
            },
          ],
        },
        fields: [
          {
            name: "draft",
            label: "Draft",
            type: "boolean",
            description: "If this is checked the post will not be published",
          },
          ...createConditionalFields().baseFields,
          ...createConditionalFields().pageFields,
        ],

        ui: {
          router: ({ document }) => {

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
        path: "content/layouts",
        format: "mdx",
        fields: [
          ...createConditionalFields().baseFields,
          ...createConditionalFields().layoutFields,
        ],
        defaultItem: {
          title: "Nueva Página",
          blocks: [
            {
              _template: "hero",
              title: "Bienvenido a la Nueva Página",
              subtitle: "Esta es una descripción de la nueva página.",
            },
          ],
        },
        ui: {
          router: ({ document }) => {
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
