import { mainBlockTemplate } from "@/components/blocks/layout-blocks/main/main.template";
import { defineConfig, Template } from "tinacms";
import {
  layoutFooterBlockTemplates,
  layoutHeaderBlockTemplates,
} from "../src/components/blocks/layout-blocks";
import { pageBlockTemplates } from "../src/components/blocks/templates";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const createConditionalFields = () => {
  const baseFields: Template["fields"] = [
    {
      type: "string",
      name: "title",
      label: "Título de la Página",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      name: "seo",
      label: "Configuración SEO",
      description: "SEO (Optimización para Motores de Búsqueda)",
      fields: [
        {
          type: "string",
          name: "metaTitle",
          label: "Meta Título",
          description:
            "Sobrescribe el título original para usar uno enfocado en SEO",
        },
        {
          type: "string",
          name: "metaDescription",
          label: "Meta Descripción",
          description:
            "Sobrescribe la descripción original para usar una enfocada en SEO",
        },
        {
          type: "string",
          name: "canonicalUrl",
          label: "URL Canónica",
          description:
            "Establece la URL canónica para evitar contenido duplicado",
        },
      ],
    },
  ];

  const pageFields: Template["fields"] = [
    {
      type: "object",
      name: "blocks",
      label: "Secciones principales de la Página",
      list: true,
      templates: pageBlockTemplates,
    },
  ];

  const layoutFields: Template["fields"] = [
    {
      type: "object",
      name: "headerBlocks",
      label: "Bloques de Encabezado",
      description: "Componentes opcionales de encabezado para el diseño",
      list: true,
      templates: [...layoutHeaderBlockTemplates, ...pageBlockTemplates],
    },
    { type: "object", ...mainBlockTemplate },
    {
      type: "object",
      name: "footerBlocks",
      label: "Bloques de Pie de Página",
      description: "Componentes opcionales de pie de página para el diseño",
      list: true,
      templates: [...layoutFooterBlockTemplates, ...pageBlockTemplates],
    },
  ];

  return { baseFields, pageFields, layoutFields };
};

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
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
        location.href =
          `/api/draft/enter?token=${token.id_token}&slug=` + location;
      },
      onLogout: async () => {
        location.href = `/api/draft/exit?slug=` + location;
      },
    },
  },

  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "pages",
        label: "Páginas",
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
            label: "Borrador",
            type: "boolean",
            description:
              "Si está marcado, la publicación permanecerá invisible públicamente",
          },
          ...createConditionalFields().baseFields,
          ...createConditionalFields().pageFields,
        ],

        ui: {
          router: ({ document }) => {
            const breadcrumbs = document._sys.breadcrumbs;

            const routeParts = breadcrumbs.slice(0, -1);

            if (routeParts.length === 0) {
              return "/";
            }

            return `/${routeParts.join("/")}`;
          },
          filename: {
            slugify: () => "page",
          },
        },
      },
      {
        name: "layouts",
        label: "Estructuras de Página",
        path: "content/layouts",
        format: "mdx",
        fields: [...createConditionalFields().layoutFields],
        ui: {
          router: ({ document }) => {
            const breadcrumbs = document._sys.breadcrumbs;
            const routeParts = breadcrumbs.slice(0, -1);

            if (routeParts.length === 0) {
              return "/";
            }

            return `/${routeParts.join("/")}`;
          },
          filename: {
            slugify: () => "layout",
          },
        },
      },
    ],
  },
});
