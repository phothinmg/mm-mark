import { load } from "js-yaml";

/**
 * Returns an array of indices of lines that start with '---' in the given array
 * @param mem The array of indices to be modified
 * @param item The current line in the iteration
 * @param i The index of the current line
 * @returns The modified array of indices
 */
export const findMetaIndices = (
  mem: number[],
  item: string,
  i: number
): number[] => {
  if (/^---/.test(item)) {
    mem.push(i);
  }

  return mem;
};

const emptyObject = {};
export type DataPros = {
  lines: any;
  metaIndices: any;
};

/**
 * Returns the parsed YAML frontmatter from the given lines array
 * @param lines The lines of text from which to extract the frontmatter
 * @returns The parsed frontmatter, or an empty object if none was found
 */
export const getData = (linesPros: DataPros): Record<string, unknown> => {
  const { lines, metaIndices } = linesPros;
  if (metaIndices.length > 0) {
    const data = lines.slice(metaIndices[0] + 1, metaIndices[1]);
    return load(data.join("\n")) as Record<string, unknown>;
  }

  return emptyObject;
};

/**
 * Returns the content of the file without the frontmatter
 * @param linesPros The lines of text from which to extract the content
 * @returns The content of the file as a single string
 */
export const getContent = (linesPros: DataPros): string => {
  let { lines, metaIndices } = linesPros;
  if (metaIndices.length > 0) {
    lines = lines.slice(metaIndices[1] + 1, lines.length);
  }
  return lines.join("\n");
};
