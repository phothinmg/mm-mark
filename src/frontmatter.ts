import { load } from "js-yaml";


type DataProps = {
  lines: any;
  metaIndices: any;
};


/**
 * Finds the indices of the metadata in a markdown file
 * @param {number[]} mem - The array of indices of the metadata
 * @param {string} item - The line of the markdown file
 * @param {number} i - The index of the line
 * @returns {number[]} - The array of indices of the metadata
 */
function findMetaIndices(mem: number[], item: string, i: number): number[] {
  // If the line starts with ---, it's a metadata delimiter
  if (/^---/.test(item)) {
    // Add the index of the line to the array of indices
    mem.push(i);
  }

  return mem;
}

const emptyObject = {};


/**
 *
 * @param {DataProps} linesPros - lines and meta indices of markdown file
 * @returns {Record<string, unknown>} - frontmatter data
 */
function getData(linesPros: DataProps): Record<string, unknown> {
  const { lines, metaIndices } = linesPros;
  if (metaIndices.length > 0) {
    const data = lines.slice(metaIndices[0] + 1, metaIndices[1]);
    return load(data.join("\n")) as Record<string, unknown>;
  }
  return emptyObject;
}



/**
 *
 * @param {DataProps} linesPros - lines and meta indices of markdown file
 * @returns {string} - content of markdown file
 */
function getContent(linesPros: DataProps): string {
    let { lines, metaIndices } = linesPros;
    if (metaIndices.length > 0) {
      lines = lines.slice(metaIndices[1] + 1, lines.length);
    }
    return lines.join("\n");
  };

  /**
   *Retrieves the frontmatter data and content from markdown contents.
   *---
   * **Input**
   * - Markdown contents.
   *
   * **Return**
   * - An object containing the frontmatter data and content.
   *   1. data: A record of key-value pairs representing the frontmatter data.
   *   2. content: The content of the file.
   *
   *
   * @param {string} contents - Markdown contents.
   * @returns {{data: Record<string, unknown>;content: string}} - Object containing the frontmatter data and content.
   */
  export default function frontmatter(contents: string): { data: Record<string, unknown>; content: string } {
    const lines = contents.split("\n");
    const metaIndices = lines.reduce(findMetaIndices, [] as number[]);
    const data = getData({ lines, metaIndices });
    const content = getContent({ lines, metaIndices });

    return { data, content };
  };

