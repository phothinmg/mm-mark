import { FrontMatter, type FrontMatterResult } from "./frontmatter/index.js";
import Showdown, { type ShowdownExtension } from "showdown";
import { mdConverter, type MdConverter } from "./converter/index.js";
import { type MmmarkUserSelectOptions } from "./helper/getalloptions.js";
export * from "./extensions/index.js";
export type Mmmark = {
  /**
 * **Retrieves the frontmatter data and content from markdown contents.**
 *
 *
 * **Input**
 * - Markdown contents.
 *
 * **Return**
 * - An object containing the frontmatter data and content.
 *   1. data: A record of key-value pairs representing the frontmatter data.
 *   2. content: The content of the file.
 *
 *
 * @example
 *
 *
 * ```ts

    const mdcontent = `
    ---
    title: hello world
    date: 2024-07-07
    tags:
        - foo
        - bar
    ---


    ## Hello

    `;

    const foo = mmmark.frontmatter(mdcontent);
    console.log(foo.data); // { title: 'hello world',  date: 2024-07-07T00:00:00.000Z, tags: [ 'foo', 'bar' ] }
    console.log(foo.content); // ## Hello
 *
 * ```
 **/
  frontmatter(content: string): FrontMatterResult;
  /**
   * Register a showdown extension.
   *
   * @param name - The name of the new extension.
   * @param ext - The extension.
   * @throws Throws if `name` is not of type string.
   */
  registerExtension(
    name: string,
    ext:
      | ShowdownExtension
      | ShowdownExtension[]
      | (() => ShowdownExtension[] | ShowdownExtension)
  ): void;
  /**
   * Checks if the given `ext` is a valid showdown extension.
   *
   * @param ext - The extension to checks.
   * @returns Returns `true` if the extension is valid showdown extension, otherwise `false`.
   */
  validateExtension(ext: ShowdownExtension[] | ShowdownExtension): boolean;
  /**
   * Removes all extensions.
   *
   * @returns {void}
   */
  removeExtensions(): void;
  Converter(options?: MmmarkUserSelectOptions): MdConverter;
};

const mmmark: Mmmark = {
  frontmatter(content: string): FrontMatterResult {
    return new FrontMatter(content).frontmatter();
  },
  registerExtension(
    name: string,
    ext:
      | ShowdownExtension
      | ShowdownExtension[]
      | (() => ShowdownExtension[] | ShowdownExtension)
  ): void {
    Showdown.extension(name, ext);
  },
  validateExtension(ext: ShowdownExtension[] | ShowdownExtension): boolean {
    return Showdown.validateExtension(ext);
  },
  removeExtensions(): void {
    Showdown.resetExtensions();
  },
  Converter(options?: MmmarkUserSelectOptions): MdConverter {
    return mdConverter(options);
  },
};

export default mmmark;
