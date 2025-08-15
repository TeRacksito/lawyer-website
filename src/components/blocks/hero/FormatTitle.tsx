/**
 * Split a title string by line breaks defined by the literal sequence "\n".
 * The function wraps each segment in a <span> and inserts a <br /> element after every span except the last one.
 * @param title - The title string to format.
 * @returns An array of React <span> elements representing the formatted title.
 */
export const formatTitle = (title: string) => {
  return title.split("\\n").map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));
};
