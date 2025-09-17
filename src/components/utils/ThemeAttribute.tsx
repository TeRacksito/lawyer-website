export const getThemeProps = (theme: string | undefined) => {
  return theme !== "parent" && theme !== undefined ? { "data-theme": theme } : {};
};
