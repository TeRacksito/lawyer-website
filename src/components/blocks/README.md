# Page Blocks System

This directory contains the block components for Tina CMS page building. Each block has its own folder containing the React component, template definition, and an index file that ties them together.

## Structure

```
blocks/
├── types.ts                  # TypeScript definitions for blocks
├── templates.ts              # Automated registry and exports
├── hero/
│   ├── HeroBlock.tsx         # React component
│   ├── hero.template.ts      # Tina template definition
│   └── index.ts              # Block definition (links component + template)
├── content/
│   ├── ContentBlock.tsx      # React component
│   ├── content.template.ts   # Tina template definition
│   └── index.ts              # Block definition
└── text/
    ├── TextBlock.tsx         # React component
    ├── text.template.ts      # Tina template definition
    └── index.ts              # Block definition
```

## Adding a New Block

### 1. Create the Block Folder

Create a new folder for your block:
```bash
mkdir src/components/blocks/my-block
```

### 2. Create the Template Definition

```typescript
// my-block/my-block.template.ts
import { Template } from "tinacms";

export const myBlockTemplate: Template = {
  name: "myBlock",
  label: "My Block",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    // Add more fields as needed
  ],
};
```

### 3. Create the React Component

```typescript
// my-block/MyBlock.tsx
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";

interface MyBlockProps {
  data: {
    title?: string | null;
    // Add other fields with proper types
  };
}

export default function MyBlock({ data }: MyBlockProps) {
  const { title } = data;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {title && (
          <h2 data-tina-field={tinaField(data, "title")}>
            {title}
          </h2>
        )}
      </div>
    </section>
  );
}
```

### 4. Create the Block Definition

```typescript
// my-block/index.ts
import { BlockDefinition } from "../types";
import { myBlockTemplate } from "./my-block.template";
import MyBlock from "./MyBlock";

export const myBlock: BlockDefinition = {
  template: myBlockTemplate,
  component: MyBlock,
};
```

### 5. Register the Block

Add your block to `templates.ts`:

```typescript
// templates.ts
import { myBlock } from "./my-block";

export const pageBlocks: BlockRegistry = [
  heroBlock,
  contentBlock,
  myBlock, // Add your block here - that's it!
];
```

**That's it!** The component will automatically be rendered when the block is used. No need to update the ClientPageWrapper manually.

## How It Works

The system automatically:
1. **Registers templates** for Tina CMS from the `pageBlocks` array
2. **Creates a component registry** that maps template names to components
3. **Renders components dynamically** by looking up the component based on the block's `__typename`

## Available Blocks

- **Hero Block** (`hero/`) - Hero sections with title, subtitle, content, and CTA
- **Content Block** (`content/`) - Rich text content with layout options
- **Text Block** (`text/`) - Simple text block with alignment and size options (disabled by default)

## Best Practices

1. **Keep related files together** - Template, component, and definition in the same folder
2. **Use descriptive folder names** - Folder name should match the block purpose
3. **Follow naming conventions**: 
   - Folder: `kebab-case`
   - Component: `PascalCase.tsx`
   - Template: `kebab-case.template.ts`
   - Definition: `index.ts`
4. **Always use `tinaField()`** for click-to-edit functionality
5. **Handle null/undefined values** gracefully
6. **Use semantic HTML elements**
7. **Include proper TypeScript interfaces**
8. **Add responsive classes** for mobile compatibility

## Styling

All blocks use Tailwind CSS classes. Make sure to:
- Use consistent spacing (`py-8`, `py-16`, etc.)
- Include responsive classes (`lg:`, `md:`, etc.)
- Use the container pattern: `container mx-auto px-4`