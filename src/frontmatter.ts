import { load } from 'js-yaml';
import fs from 'fs';
/**
 * Finds the indices of the metadata in an array of items.
 *
 * @param {any[]} mem - The array to store the indices of the metadata.
 * @param {any} item - The current item being processed.
 * @param {number} i - The index of the current item.
 * @return {any[]} The array of indices of the metadata.
 */
const findMetaIndices = (mem: any, item: any, i: any): any => {
    if (/^---/.test(item)) {
      mem.push(i)
    }
  
    return mem
}

const emptyObject = {}
export type DataPros = {
    lines: any;
    metaIndices: any;
}
/**
 * Retrieves data based on the meta indices from the lines.
 *
 * @param {DataPros} lines - The lines containing the data.
 * @param {DataPros} metaIndices - The indices indicating the metadata.
 * @return {any} The retrieved data or an empty object.
 */
const getData  = ({ lines, metaIndices }: DataPros) : any=> {
  if (metaIndices.length > 0) {
    const data = lines.slice(metaIndices[0] + 1, metaIndices[1])
    return load(data.join('\n'))
  }

  return emptyObject
}
/**
 * Returns the content of the file after removing the metadata.
 *
 * @param {DataPros} lines - The lines of the file.
 * @param {DataPros} metaIndices - The indices of the metadata in the file.
 * @return {any} The content of the file after removing the metadata.
 */
const getContent = ({ lines, metaIndices }: DataPros): any => {
    if (metaIndices.length > 0) {
      lines = lines.slice(metaIndices[1] + 1, lines.length)
    }
  
    return lines.join('\n')
}

/**
 * Reads the contents of a file and extracts the frontmatter data and content.
 *
 * @param {string} filePhat - The path to the file.
 * @return {Object} An object containing the frontmatter data and content.
 */
const frontmatter = (filePhat: string): any => {
    const contents    = fs.readFileSync(filePhat, 'utf8');
    const lines       = contents.split('\n');
    const metaIndices = lines.reduce(findMetaIndices, []);
    const data        = getData({ lines, metaIndices });
    const content     = getContent({ lines, metaIndices });
  
    return { data, content }
  }
  
  export default frontmatter