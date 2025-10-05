import { themeField } from "@/components/utils/template-fields/theme.field";
import { Template } from "tinacms";

export const textArticleTemplate: Template = {
  name: "text_article",
  label: "Artículo de Texto",

  fields: [themeField],
};
