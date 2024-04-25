import showdown from "showdown";
import { load } from "js-yaml";
import fs from "node:fs";

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
 * Retrieves data based on the meta indices from the lines.
 *
 * @param {DataPros} lines - The lines containing the data.
 * @param {DataPros} metaIndices - The indices indicating the metadata.
 * @return {any} The retrieved data or an empty object.
 */
const getData = ({ lines, metaIndices }: DataPros): any => {
  if (metaIndices.length > 0) {
    const data = lines.slice(metaIndices[0] + 1, metaIndices[1]);
    return load(data.join("\n"));
  }

  return emptyObject;
};

/**
 * Returns the content of the file after removing the metadata.
 *
 * @param {DataPros} lines - The lines of the file.
 * @param {DataPros} metaIndices - The indices of the metadata in the file.
 * @return {any} The content of the file after removing the metadata.
 */
const getContent = ({ lines, metaIndices }: DataPros): any => {
  if (metaIndices.length > 0) {
    lines = lines.slice(metaIndices[1] + 1, lines.length);
  }
  return lines.join("\n");
};
/**
 * Reads the contents of a file and extracts the frontmatter data and content.
 *
 * @param {string} filePhat - The path to the file.
 * @return {Object} An object containing the frontmatter data and content.
 */
const frontmatter = (filePhat: string): any => {
  const contents = fs.readFileSync(filePhat, "utf-8");
  const lines = contents.split("\n");
  const metaIndices = lines.reduce(findMetaIndices, []);
  const data = getData({ lines, metaIndices });
  const content = getContent({ lines, metaIndices });

  return { data, content };
};
/**
 * Convert markdown and HTML .
 * ----------
 *
 * ***Base on Showndown***
 *
 * @example
 * const converter = new converter(filePath: string, options: {}, extensions: []);
 *  //filePath - The path of the file to be converted.
 *  //options - Showdown Options
 *  //extensions - Showdown Extensions
 *
 *
 * @return
 * - json : {data: *frontmatter*, content: markdown content(before convert)}
 * - data : frontmatter , default  date and title
 * - content :  markdown content(before convert)
 * - convertedContent : Converted content.
 * - markdownContent : Markdown content.
 */
export class converter {
  private filePath: string;
  private options: {};
  private defaultOptions: {};
  private extensions: [];
  private defaultExtensions: [];
  private opts: {};
  private exts: [];
  /**
   * Creates an instance of the Converter class.
   *
   * @param {string} filePath - The path of the file to be converted.
   * @param {object} options - Showdown Options
   * @param extensions - Showdown Extensions
   */
  constructor(filePath: string, options: {}, extensions: []) {
    this.filePath = filePath;
    this.extensions = extensions;
    this.options = options;
    this.defaultOptions = {
      tables: true,
      emoji: true,
    };
    this.defaultExtensions = [];
    this.exts = [...this.extensions, ...this.defaultExtensions];
    this.opts = {
      ...this.options,
      ...this.defaultOptions,
      extensions: this.exts,
    };
  }

  /**
   * Initializes and configures a showdown.Converter object with specific options and flavor.
   * @returns {showdown.Converter} The initialized converter object.
   */
  private convert(): showdown.Converter {
    const converter = new showdown.Converter(this.opts);

    converter.setFlavor("github");
    return converter;
  }

  /**
   * Retrieves the content of the file using frontmatter.
   *
   * @return {any} The frontmatter content of the file.
   */
  private filecontent(): any {
    try {
      return frontmatter(this.filePath);
    } catch (error) {
      console.error("Error reading or parsing file:", error);
      return null; // Or handle error as appropriate
    }
  }

  /**
   * Retrieves the data from the frontmatter of the file at the specified file path.
   *
   * @return {any} The data retrieved from the frontmatter of the file.
   */
  get data(): any {
    return this.filecontent().data;
  }
  /**
   * Retrieves the content from the frontmatter of the file at the specified file path.
   *
   * @return {any} The content retrieved from the frontmatter of the file.
   */
  get content(): any {
    return this.filecontent().content;
  }
  /**
   * Retrieves the post title from the data object.
   *
   * @return {any} The post title.
   */

  get json(): string {
    return JSON.stringify(this.filecontent());
  }
  /**
   * Returns the converted content of the object as a string.
   *
   * @return {string} The converted content as a string.
   */
  get convertedContent(): string {
    return this.convert().makeHtml(this.content);
  }
  get markdownContent(): string {
    return this.convert().makeMarkdown(this.content);
  }
}
