import { mainBlockTemplate } from "@/components/blocks/layout-blocks/main/main.template";
import { sectionBlockTemplates } from "@/components/blocks/section-blocks";
import { getSEOGeneratorField } from "@/components/utils/template-fields/seo-generator.field";
import { getTemplateDescriptionField } from "@/components/utils/template-fields/template-description";
import { getTemplateWarningField } from "@/components/utils/template-fields/template-warning";
import { defineConfig, Template } from "tinacms";
import {
  layoutFooterBlockTemplates,
  layoutHeaderBlockTemplates,
} from "../src/components/blocks/layout-blocks";

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
        getTemplateDescriptionField(
          "Configuración SEO",
          "Opciones para mejorar la visibilidad en motores de búsqueda.",
          "SEO, o *Search Engine Optimization* en inglés, se refiere a las prácticas y técnicas " +
            "utilizadas para mejorar la ==visibilidad== y el ==posicionamiento== de un sitio web en los resultados " +
            "orgánicos de los motores de búsqueda como Google.\n\n" +
            "Una buena configuración SEO ayuda a que su sitio web sea **más fácilmente** encontrado por usuarios " +
            "que buscan contenido relacionado, lo que puede aumentar el tráfico y la relevancia del sitio.\n\n" +
            "Las opciones de SEO incluyen la ==personalización de metadatos== como títulos y descripciones, la gestión " +
            "de URLs canónicas para evitar contenido duplicado, y otras configuraciones que optimizan cómo los motores " +
            "de búsqueda indexan y presentan su sitio."
        ),
        getTemplateWarningField(
          "¡Cuidado!",
          "El SEO no es sencillo.",
          "El SEO puede resultar complejo y confuso.\n\n" +
            "No es siempre trivial entender qué valores son los más adecuados para cada página, " +
            "especialmente en sitios con mucho contenido, o contenido abstracto.\n\n" +
            "Si no está seguro de cómo configurar el SEO, considere contactar con el desarrollador encargado " +
            "[Angel K.S.](mailto:angelnks100@gmail.com)."
        ),
        getSEOGeneratorField(),
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
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "keywords",
          label: "Palabras Clave",
          list: true,
          description:
            "Palabras clave relevantes separadas por comas para mejorar el SEO",
          ui: {
            component: "tags",
          },
        },
        {
          type: "object",
          name: "social",
          label: "Redes Sociales",
          description: "Configuración para compartir en redes sociales",
          ui: {
            defaultItem: {
              ogType: "website",
              twitterCard: "summary_large_image",
            },
          },
          fields: [
            getTemplateDescriptionField(
              "Configuración de Redes Sociales",
              "Optimiza cómo se ve tu contenido al compartirlo.",
              "Las ==redes sociales== utilizan metadatos específicos para mostrar **previsualizaciones** " +
                "enriquecidas cuando alguien comparte tu página.\n\n" +
                "**Open Graph** es el protocolo utilizado por Facebook, LinkedIn y otras plataformas.\n" +
                "**Twitter Cards** permite controlar cómo se muestran los enlaces en Twitter/X.\n\n" +
                "Configurar correctamente estos metadatos puede ==aumentar significativamente== el engagement " +
                "y las visitas desde redes sociales."
            ),
            {
              type: "string",
              name: "ogImage",
              label: "Imagen Open Graph",
              description:
                "URL de la imagen que se mostrará al compartir en redes sociales",
            },
            {
              type: "string",
              name: "ogType",
              label: "Tipo Open Graph",
              description:
                "Tipo de contenido para Open Graph (website, article, etc.)",
              options: [
                { value: "website", label: "Sitio Web" },
                { value: "article", label: "Artículo" },
                { value: "profile", label: "Perfil" },
              ],
            },
            {
              type: "string",
              name: "twitterCard",
              label: "Tipo de Tarjeta Twitter",
              description: "Tipo de tarjeta de Twitter a utilizar",
              options: [
                { value: "summary", label: "Resumen" },
                {
                  value: "summary_large_image",
                  label: "Resumen con Imagen Grande",
                },
                { value: "app", label: "Aplicación" },
                { value: "player", label: "Reproductor" },
              ],
            },
            {
              type: "string",
              name: "twitterSite",
              label: "Twitter Site",
              description: "Usuario de Twitter del sitio (ej: @usuario)",
            },
            {
              type: "string",
              name: "twitterCreator",
              label: "Twitter Creator",
              description:
                "Usuario de Twitter del creador del contenido (ej: @usuario)",
            },
          ],
        },
        {
          type: "object",
          name: "advanced",
          label: "Configuración Avanzada",
          description: "Opciones avanzadas de SEO para usuarios experimentados",
          ui: {
            defaultItem: {
              canonicalUrl: "",
              robots: "index, follow",
            },
          },
          fields: [
            getTemplateDescriptionField(
              "Configuración Avanzada de SEO",
              "Opciones técnicas para control preciso del SEO.",
              "Estas opciones son para ==usuarios avanzados== y pueden tener un **impacto significativo** " +
                "en cómo los motores de búsqueda tratan tu página.\n\n" +
                "**URL Canónica**: Indica cuál es la versión principal de una página cuando existe contenido " +
                "duplicado o similar. Útil para consolidar señales de SEO.\n\n" +
                "**Directivas Robots**: Controla si los motores de búsqueda deben indexar la página y seguir " +
                "los enlaces. Usar con precaución ya que una configuración incorrecta puede ==ocultar páginas== " +
                "de los resultados de búsqueda."
            ),
            getTemplateWarningField(
              "¡Cuidado!",
              "Estas opciones son avanzadas.",
              "Modificar estas opciones sin el conocimiento adecuado puede llevar a resultados no deseados, " +
                "como que una página importante no sea indexada por los motores de búsqueda.\n\n" +
                "Si no está seguro de cómo utilizar estas configuraciones, es recomendable dejar los valores " +
                "predeterminados o contactar con el desarrollador encargado " +
                "[Angel K.S.](mailto:angelnks100@gmail.com)."
            ),
            {
              type: "string",
              name: "canonicalUrl",
              label: "URL Canónica",
              description:
                "Establece la URL canónica para evitar contenido duplicado",
            },
            {
              type: "string",
              name: "robots",
              label: "Directivas Robots",
              description:
                "Controla cómo los motores de búsqueda indexan esta página",
              options: [
                {
                  value: "index, follow",
                  label: "Indexar y Seguir (Predeterminado)",
                },
                { value: "noindex, follow", label: "No Indexar, pero Seguir" },
                { value: "index, nofollow", label: "Indexar, pero No Seguir" },
                { value: "noindex, nofollow", label: "No Indexar, ni Seguir" },
              ],
            },
          ],
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
      templates: sectionBlockTemplates,
    },
  ];

  const layoutFields: Template["fields"] = [
    {
      type: "object",
      name: "headerBlocks",
      label: "Bloques de Encabezado",
      description: "Componentes opcionales de encabezado para el diseño",
      list: true,
      templates: [...layoutHeaderBlockTemplates, ...sectionBlockTemplates],
    },
    { type: "object", ...mainBlockTemplate },
    {
      type: "object",
      name: "footerBlocks",
      label: "Bloques de Pie de Página",
      description: "Componentes opcionales de pie de página para el diseño",
      list: true,
      templates: [...layoutFooterBlockTemplates, ...sectionBlockTemplates],
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
          getTemplateDescriptionField(
            "Una página",
            "Una página concreta del sitio web.",
            "Página o *page* en inglés. Los documentos reconocidos como Páginas se llaman `page.mdx`\n\n" +
              "Cada página representa un documento individual en el sitio web.\n\n" +
              "Las páginas pueden contener ==múltiples secciones== y, estas, bloques de contenido, " +
              "permitiendo una gran flexibilidad en la presentación de la información.\n" +
              "Se utilizan para estructurar el contenido del sitio.\n\n" +
              "Recuerde que cada página tiene una **única URL**. Dicha URL se compone a partir de la " +
              "estructura de carpetas y **no** el nombre del archivo. Por ejemplo, una página ubicada en " +
              "`content/pages/about/page.mdx` tendrá la URL `/about`."
          ),
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
        fields: [
          getTemplateDescriptionField(
            "Una estructura de página",
            "Una estructura reutilizable para páginas.",
            "Estructura o *layout* en inglés. Los documentos reconocidos como Estructuras se llaman `layout.mdx`\n\n" +
              "Las **estructuras de página** permiten crear diseños comunes que pueden " +
              "utilizarse en varias páginas, manteniendo un aspecto uniforme en todo el sitio web.\n\n" +
              "==¿Para qué sirven las estructuras?==\n" +
              "• **Reutilizables**: Cree un diseño una vez y utilícelo en muchas páginas.\n" +
              "• **Organizadas**: Mantienen la misma apariencia en las páginas que las usan.\n" +
              "• **No visibles**: No aparecen como páginas web normales, es decir, **no existe un URL " +
              "concreto** que muestre única y exclusivamente la estructura concreta. Dicho de otra " +
              "forma, las estructuras solo existen para ser usadas por páginas.\n\n" +
              "==Cómo funcionan las carpetas:==\n" +
              "Las estructuras siguen el mismo sistema de carpetas que las páginas. Una estructura en " +
              "`content/layouts/services/layout.mdx` se aplicará automáticamente a todas las páginas " +
              "*(y sub-estructuras)* dentro de la carpeta `services/` *(y sub-carpetas)*.\n\n" +
              "==Estructuras combinadas:==\n" +
              "Las estructuras se componen con las estructuras padre cuando existen. " +
              "Por ejemplo, una estructura de `services` tomará la estructura principal como base " +
              "y agregar elementos específicos para esa sección."
          ),
          getTemplateWarningField(
            "¡Cuidado!",
            "Las estructuras no son sencillas.",
            "Trabajar con estructuras puede ser complejo y confuso.\n\n" +
              "La propiedad de ==composición automática==, aunque poderosa y eficiente, puede llevar " +
              "a resultados inesperados si no se comprende completamente su funcionamiento.\n\n" +
              "No es siempre trivial entender dónde y cómo se aplican las estructuras, " +
              "especialmente en sitios con muchas páginas y estructuras anidadas.\n\n" +
              "Si no está seguro de cómo funcionan las estructuras, considere contactar " +
              "con el desarrollador encargado [Angel K.S.](mailto:angelnks100@gmail.com)."
          ),
          ...createConditionalFields().layoutFields,
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
            slugify: () => "layout",
          },
        },
      },
    ],
  },
});
