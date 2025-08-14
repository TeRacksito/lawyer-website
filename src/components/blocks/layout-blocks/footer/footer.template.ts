import { Template } from "tinacms";

export const footerBlockTemplate: Template = {
  name: "footer",
  label: "Footer Block",
  fields: [
    {
      name: "dataTheme",
      label: "Data Theme",
      type: "string",
      description: "Theme for the footer component"
    },
    {
      name: "firmInfo",
      label: "Firm Information",
      type: "object",
      fields: [
        {
          name: "name",
          label: "Firm Name",
          type: "string"
        },
        {
          name: "title",
          label: "Professional Title",
          type: "string"
        },
        {
          name: "address",
          label: "Address",
          type: "string",
          ui: {
            component: "textarea"
          }
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "string"
        },
        {
          name: "email",
          label: "Email",
          type: "string"
        }
      ]
    },
    {
      name: "practiceAreas",
      label: "Practice Areas",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "string"
        },
        {
          name: "areas",
          label: "Practice Areas",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => ({
              label: item?.name
            })
          },
          fields: [
            {
              name: "name",
              label: "Practice Area Name",
              type: "string"
            },
            {
              name: "href",
              label: "Link URL",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      name: "quickLinks",
      label: "Quick Links",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "string"
        },
        {
          name: "links",
          label: "Quick Links",
          type: "object",
          list: true,
          ui: {
            itemProps: (item: any) => ({
              label: item?.label
            })
          },
          fields: [
            {
              name: "label",
              label: "Link Label",
              type: "string"
            },
            {
              name: "href",
              label: "Link URL",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      name: "legalInfo",
      label: "Legal Information",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "string"
        },
        {
          name: "college",
          label: "Bar Association",
          type: "string"
        },
        {
          name: "license",
          label: "License Number",
          type: "string"
        },
        {
          name: "hours",
          label: "Office Hours",
          type: "string",
          ui: {
            component: "textarea"
          }
        },
        {
          name: "consultationButtonText",
          label: "Consultation Button Text",
          type: "string"
        },
        {
          name: "consultationButtonHref",
          label: "Consultation Button Link",
          type: "string"
        }
      ]
    },
    {
      name: "legalNotice",
      label: "Legal Notice",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Legal Notice Title",
          type: "string"
        },
        {
          name: "disclaimers",
          label: "Legal Disclaimers",
          type: "rich-text"
        }
      ]
    },
    {
      name: "legalLinks",
      label: "Legal Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: any) => ({
          label: item?.label
        })
      },
      fields: [
        {
          name: "label",
          label: "Link Label",
          type: "string"
        },
        {
          name: "href",
          label: "Link URL",
          type: "string"
        }
      ]
    },
    {
      name: "copyright",
      label: "Copyright Information",
      type: "object",
      fields: [
        {
          name: "text",
          label: "Copyright Text",
          type: "string"
        }
      ]
    }
  ]
};
