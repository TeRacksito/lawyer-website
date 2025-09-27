/**
 * Truncates a string to a specified maximum length and appends a suffix if truncated.
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the text before truncation.
 * @param suffix - The suffix to append if the text is truncated (default: "...").
 * @returns The truncated text.
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + suffix;
}
