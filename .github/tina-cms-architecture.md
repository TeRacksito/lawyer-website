# Tina CMS Architecture & Component Development Guide

## Overview

This project uses **Tina CMS** with a hierarchical block system for component architecture. Components are organized into different block types that compose complex pages through recursive rendering.

The system follows a **three-tier block hierarchy** where each tier has distinct responsibilities and composition patterns. Understanding this hierarchy is key to working with the codebase.

## Block Type Hierarchy

The project has three main block categories with specific purposes:

### 1. **Section Blocks** (Top-level containers)
- **Purpose**: Top-level page sections that serve as full-width containers with theme support
- **Location**: `src/components/blocks/section-blocks/`
- **Characteristics**:
  - Define page layout structure (hero, basic sections, columns, etc.)
  - Support theme switching (light/dark/parent inheritance)
  - Render nested content blocks via `BlockRenderer`
  - May use `getThemeProps()` for theme application
  - Typically full-width or max-width containers
  - Entry point for page composition
- **When to create**: When you need a structural container that organizes content areas
- **Look for examples**: Search for files with "Section" or "Block" suffix in the `section-blocks/` directory

### 2. **Content Blocks** (Reusable components)
- **Purpose**: Medium-complexity components that render inside section blocks
- **Location**: `src/components/blocks/content-blocks/`
- **Characteristics**:
  - Render content with layout variants (single-column, two-column, sidebar patterns, etc.)
  - Often use rich-text markdown rendering via `TinaMarkdownRenderer`
  - Can contain simple or structured text, headings, paragraphs
  - Organized with standard spacing and container widths
  - Include a special `SpecialBlock` container to embed special blocks
- **When to create**: For reusable content components that appear in multiple section types
- **Look for examples**: Check existing components like `ContentBlock`, `TitleBlock`, `ParagraphBlock` for patterns

### 3. **Special Blocks** (Complex self-contained components)
- **Purpose**: Complex, self-contained components with unique layouts and interactions
- **Location**: `src/components/blocks/special-blocks/`
- **Characteristics**:
  - Self-contained visual components (timelines, CTAs, presentations, lists, etc.)
  - Support animations via `framer-motion`
  - Often include list-based or complex nested data structures
  - Embedded via `SpecialBlock` content block
  - Support theme switching
  - Can have unique styling and interactive behavior
- **When to create**: For visually distinct or interactive components that need special handling
- **Look for examples**: Browse existing blocks like `TimelineBlock`, `CallToActionBlock`, `ValuesPresentationBlock`

## Block Structure Pattern

Every block follows this standard folder structure:

```
block-type-name/
├── index.ts                        # Block definition export (BlockDefinition)
├── BlockTypeName.tsx               # Component file (main React component)
└── block-type-name.template.tsx    # Tina template configuration
```

**Key naming conventions**:
- Component file: `PascalCase` (e.g., `TimelineBlock.tsx`)
- Template file: `lowercase-with-hyphens.template.tsx` (e.g., `timeline.template.tsx`)
- Template name field: `lowercase_with_underscores` (e.g., `timeline`, `call_to_action`)
- Index exports: `blockNameBlock` as variable, `BlockNameTemplate` as type

### Component File Structure

**Component files** (`*Block.tsx`):
- Accept props: `data` (main content), `dataTinaField?` (for CMS binding), `motionDelay?` (for animations)
- Add `data-tina-field` attributes to all editable elements for CMS visual editing
- Use `TinaMarkdownRenderer` for any markdown/rich-text content
- Define TypeScript interfaces for data structure
- Export as default function component
- Use `"use client"` directive for client-side components

**Template files** (`*template.tsx`):
- Define Tina CMS template configuration
- Start with `getTemplateDescriptionField()` for template documentation
- Define field structures matching component interfaces
- Use appropriate field types (string, rich-text, object, boolean, etc.)
- Provide default values in `ui.defaultItem`
- Include meaningful labels and descriptions for each field

**Export files** (`index.ts`):
- Import template and component
- Create `BlockDefinition` object linking template and component
- Export single block definition

## Key Concepts & Patterns

### 1. Template Fields (`src/components/utils/template-fields/`)

**Template Field Utilities**:
- `getTemplateDescriptionField()`: Creates formatted info box for template documentation
  - Blue-themed expandable field
  - Used as first field in every template
  - Parameters: `title`, `description`, optional `moreInfo` (markdown-enabled)
  - Located in `template-fields/` directory

- Other field utilities: Theme toggles, text alignment, vertical alignment, warnings, SEO generation
- These are reusable across different templates for consistency

**Usage pattern**:
```tsx
fields: [
  getTemplateDescriptionField(
    "Block Title",
    "Main description",
    "Optional additional info with **markdown**"
  ),
  // ... additional fields
]
```

### 2. Rich-Text Fields

**For markdown-enabled fields**:
- Use field type `rich-text` in template
- Data comes in as structured markdown content
- Must render using `TinaMarkdownRenderer` component
- Import from `@/components/utils/TinaMarkdownRenderer`
- Pass `content` prop and optional `className`

**Location**: Search for `TinaMarkdownRenderer` usage in existing blocks or check `utils/` directory

### 3. Tina Field Binding

**All editable content** requires `data-tina-field` attributes for CMS visual editing:
- Use `tinaField()` helper from `tinacms/dist/react`
- Apply to direct element containing the editable content
- For arrays: bind container and nested fields separately
- Container-level binding: use `dataTinaField` prop

**Patterns**:
```tsx
// Simple field
<h3 data-tina-field={tinaField(data, "fieldName")}>
  {data.fieldName}
</h3>

// Array items
{items.map((item, index) => (
  <div data-tina-field={tinaField(item, "")}>
    {/* nested content */}
  </div>
))}

// Container binding
<div data-tina-field={dataTinaField}>
  {/* component content */}
</div>
```

### 4. Block Registry Pattern

Each block category maintains a registry file (`index.ts`):
- Imports all block definitions from subdirectories
- Exports: blocks array, templates array, component registry object
- Registry enables `BlockRenderer` to find components by template name
- Maintains centralized control over available blocks

**Location**: `section-blocks/index.ts`, `content-blocks/index.ts`, `special-blocks/index.ts`

### 5. BlockRenderer (Generic Recursive Renderer)

**Purpose**: Renders arrays of block data using a component registry
- Maps `_template` field to component lookup
- Applies progressive animation delays
- Provides CMS field binding
- Enables recursive block composition

**Location**: `src/components/blocks/BlocksRenderer.tsx`
**Usage**: Pass blocks array, components registry, parent data, and field name

### 6. Theme Support

**Sections support theme switching**:
- Template includes theme field toggle
- Component receives theme value
- Apply with utility function (search for `getThemeProps()` or similar theme utility)
- Enables light/dark/inherited theme modes

**Location**: Search `utils/` for theme-related utilities like `ThemeAttribute.tsx`

### 7. Animations

**Framer Motion animations**:
- Used for motion effects in components
- Progressive delays passed via `motionDelay` prop
- `BlockRenderer` calculates delays for cascading animations
- Common patterns: fade-in, slide-up, scale, etc.

**Location**: Import from `framer-motion` package

## Component Development Workflow

### Creating a New Block

1. **Create folder** in appropriate category (`section-blocks/`, `content-blocks/`, or `special-blocks/`)

2. **Create component file** (e.g., `ComponentNameBlock.tsx`):
   - Define data interface(s) for the component props
   - Accept `data`, `dataTinaField?`, `motionDelay?` props
   - Add `data-tina-field` to editable elements
   - Use `TinaMarkdownRenderer` for rich-text content
   - Export as default

3. **Create template file** (e.g., `component-name.template.tsx`):
   - Import `Template` from `tinacms`
   - Import `getTemplateDescriptionField` from template utilities
   - Define template with name (snake_case), label, default values, and fields
   - Match field structure to component data interface

4. **Create index file** (e.g., `index.ts`):
   - Import `BlockDefinition` type
   - Import template and component
   - Export `BlockDefinition` linking both

5. **Register block** in category registry:
   - Add import in `{category}-blocks/index.ts`
   - Add to blocks array

6. **Use in pages**:
   - Add to section via content blocks
   - Or use in special blocks container
   - Or create new section if it's a section block

### Best Practices

1. **Field Naming**: Use `snake_case` for Tina field names
2. **Component Naming**: Use `PascalCase` for component files
3. **Template Names**: Use `lowercase_with_underscores`
4. **Default Values**: Always provide sensible defaults in templates
5. **Documentation**: Use `getTemplateDescriptionField()` consistently
6. **Comments**: Avoid step-by-step comments; use docstrings and inline comments for complex logic only (see `copilot-instructions.md`)
7. **Type Safety**: Define TypeScript interfaces for all data structures
8. **Accessibility**: Ensure interactive elements are keyboard/screen-reader accessible
9. **Responsive Design**: Use Tailwind responsive breakpoints (md:, lg:, etc.)
10. **Performance**: Consider memoization for components with complex rendering

## File Organization Principles

The component system uses a consistent organizational structure:

**By Category**:
- `section-blocks/` - Page-level structural containers
- `content-blocks/` - Reusable content components
- `special-blocks/` - Complex interactive/visual components
- `layout-blocks/` - Layout components (header, footer, main wrapper)

**Utilities**:
- `utils/` - Shared utilities and helpers
- `utils/template-fields/` - Reusable Tina template field components
- Markdown rendering, theme utilities, text formatting, etc.

**Search Strategy**:
- Look for similar existing blocks as examples
- Check `template-fields/` for reusable field utilities
- Browse `utils/` for common helper functions
- Use component naming patterns to find related files

## Tina CMS Field Types Reference

Common field types used in templates:

- `string`: Simple text input
- `rich-text`: Markdown editor with formatting (render with `TinaMarkdownRenderer`)
- `boolean`: Toggle/checkbox input
- `number`: Numeric input
- `object`: Grouped related fields (can use `list: true` for arrays)
- `reference`: Link to other content documents
- Custom UI: Can define custom component via `ui.component` for special inputs

## Debugging & Troubleshooting

**Template issues**:
- Template name must match component's `_template` field (case matters, use snake_case)
- Check registry exports to ensure block is included
- Verify imports and paths are correct

**CMS visual editing not working**:
- Verify `data-tina-field` attributes are present on elements
- Check field names match template field definitions
- Ensure component is properly registered in registry

**Rich-text not rendering**:
- Verify using `TinaMarkdownRenderer` wrapper component
- Check content is not null/undefined
- Look for errors in markdown structure

**Styling/theming issues**:
- Check theme utility function is being called
- Verify theme prop is passed correctly
- Look for conflicting Tailwind classes

**Animations not working**:
- Verify `motionDelay` prop is received (may be undefined)
- Check `framer-motion` imports
- Ensure `whileInView` or animation triggers are correct

## Converting Existing Components to Blocks

**Process**:
1. Analyze component structure and identify hierarchy levels
2. Extract structural layout as section block
3. Extract content areas as content blocks
4. Extract complex UI as special blocks
5. Define Tina templates for each block
6. Add `data-tina-field` attributes throughout
7. Register blocks in appropriate registries
8. Test in Tina CMS admin panel for visual editing

**Preserve**:
- Visual appearance and animations
- Responsive behavior
- User interactions
- Accessibility features

## Key Files & What to Search For

When working with this system, search for:

- **"BlockDefinition"** - Type definition and patterns
- **"BlockRegistry"** - How blocks are organized into arrays
- **"BlockRenderer"** - How blocks are recursively rendered
- **"tinaField"** - CMS field binding pattern
- **"getTemplateDescriptionField"** - Template documentation pattern
- **"TinaMarkdownRenderer"** - Markdown rendering pattern
- **"getThemeProps"** - Theme application pattern
- **"motion.div"** or **"motion.section"** - Animation patterns
- **"data-tina-field"** - Visual editing binding

These patterns appear consistently across all blocks and utilities.


It's important to know that any text inside a TinaCMS field on the editor as a custom component,
will not wrap automatically. You need to add this styling `leading-relaxed whitespace-pre-line`