import ReactIconPicker from "./ReactIconPicker";

/**
 * Creates a TinaCMS field configuration for selecting React Icons (FA6).
 * Provides a searchable icon picker interface.
 *
 * @param name - Field name (e.g., "icon")
 * @param label - Display label (e.g., "Icon")
 * @param description - Optional helper text
 * @returns TinaCMS field configuration object
 */
export function getIconField(
  name: string,
  label: string,
  description?: string
) {
  return {
    name,
    label,
    type: "string" as const,
    description,
    ui: {
      component: ReactIconPicker,
    },
  };
}
