import Showdown from "showdown";
import showdownPrism from "showdown-prism";
import showdownMathjax from "showdown-mathjax";
import frontmatter from "./frontmatter";
import { supportedLanguages } from "./supportedLangs";
/**
 * # mm-mark
 *
 * ---
 *
 * ## Convert Markdown to HTML
 *
 *
 *  > Mmmark : Convert Md to Html with my own Prism.js code highlight and Mathjax extenstions of Showdown.Js.
 *
 *  > ***_Note : This package was created for my personal blog._***
 *
 *
 * ### Main dependencies bundled license information.
 *
 *
 * ---
 *
 * #### 1. Showdown.js
 *
 * Showdown.js is a powerful JavaScript library used for converting Markdown into HTML.
 *
 * It's a key dependency in our project, providing the core functionality of our Markdown to HTML conversion.
 *
 * Version: 2.1.0
 *
 * Release Date: 21-04-2022
 *
 * [Showdown.js GitHub](https://github.com/showdownjs/showdown)
 *
 * License: MIT
 *
 * ---
 *
 * #### 2. JS-YAML
 *
 * JS-YAML is a JavaScript implementation of YAML, a human-friendly data serialization standard.
 *
 * In our project, it's used for parsing YAML front matter in Markdown files.
 *
 * Version: 4.1.0
 *
 * [JS-YAML GitHub](https://github.com/nodeca/js-yaml)
 *
 * License: MIT
 *
 * ---
 *
 *
 *
 */
namespace Mmmark {
  /**
   * Type definition for MmmarkOptions.
   *
   * @property {string} theme - The theme for Mmmark.
   * @property {string[]} languages - The supported languages for Mmmark.
   */
  export type MmmarkOptions = {
    theme?: string;
    languages?: string[];
  };
  /**
   * Converts Markdown text to HTML using Showdown library.
   *
   * @param options - Optional configuration options for the converter.
   * @returns The Showdown Converter instance.
   */
  const converter = (options?: MmmarkOptions): Showdown.Converter => {
    const extensionsConfig = [
      showdownMathjax,
      showdownPrism({
        languages: [...supportedLanguages, ...(options?.languages ?? [])],
        theme: options?.theme,
      }),
    ];
    const converterOptions = {
      /**
       * Parse image dimensions.
       */
      parseImgDimensions: true,
      /**
       * Simplified auto link.
       */
      simplifiedAutoLink: true,
      /**
       * Strikethrough.
       */
      strikethrough: true,
      /**
       * Table support.
       */
      tables: true,
      /**
       * Task list support.
       */
      tasklists: true,
      /**
       * Open link in new window.
       */
      openLinksInNewWindow: true,
      /**
       * Emoji support.
       */
      emoji: true,
      /**
       * More styling.
       */
      moreStyling: true,
      /**
       * Showdown extensions.
       */
      extensions: extensionsConfig,
    };
    /**
     * Showdown Converter instance.
     */
    const converterInstance = new Showdown.Converter(converterOptions);
    /**
     * Set flavor.
     */
    converterInstance.setFlavor("github");
    /**
     * Return converter instance.
     */
    return converterInstance;
  };
  /**
   * Generates data and content from the markdown content.
   *
   * @param text - The input text.
   * @returns An object containing the generated data and content.
   */
  export const getFrontmatter = (
    text: string
  ): { data: Record<string, unknown>; content: string } => {
    const { data, content } = frontmatter(text);
    return {
      data,
      content,
    };
  };
  /**
   * Type definition for RenderOptions.
   *
   * @property {string} text - The input text.
   * @property {MmmarkOptions} mmOptions - Optional configuration options for the Mmmark converter.
   * @property {boolean} metadata - Flag indicating whether to include metadata in the rendered HTML.
   */
  type RenderOptions = {
    text: string;
    mmOptions: MmmarkOptions;
    metadata: boolean;
  };
  function getContent(Opts: RenderOptions): string {
    return Opts.metadata ? frontmatter(Opts.text).content : Opts.text;
  }
  /**
   * Wraps the given HTML content in a div with the ID "mmmark".
   *
   * @param content - The HTML content to wrap.
   * @returns The wrapped HTML content.
   */
  function createHtmlWrapper(content: string): string {
    // Wrap the given HTML content in a div with the ID "mmmark".
    return `<div id="mmmark">${content}</div>`;
  }
  /**
   * Renders the given text as HTML using the Showdown library.
   *
   * @param opts - The rendering options.
   * @returns The rendered HTML string.
   */
  export const renderHtml = (opts: RenderOptions): string => {
    const content: string = getContent(opts);
    const cont: Showdown.Converter = converter(opts.mmOptions);
    const html: string = cont.makeHtml(content);
    return createHtmlWrapper(html);
  };
}

export default Mmmark;
