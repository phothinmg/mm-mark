import { load } from "js-yaml";
import Showdown from "showdown";
import showdownMathjax from "showdown-mathjax";
import showdownPrism from "showdown-prism";

/* 
## Main dependencies bundled license information.

### 1. Showdown.js

Showdown.js is a powerful JavaScript library used for converting Markdown into HTML. It's a key dependency in our project, providing the core functionality of our Markdown to HTML conversion.

- Version: 2.1.0
- Release Date: 21-04-2022
- [Showdown.js GitHub](https://github.com/showdownjs/showdown)
- License: MIT

### 2. JS-YAML

JS-YAML is a JavaScript implementation of YAML, a human-friendly data serialization standard. In our project, it's used for parsing YAML front matter in Markdown files.

- Version: 4.1.0
- [JS-YAML GitHub](https://github.com/nodeca/js-yaml)
- License: MIT

### 3. Other dependencies

- Prism.Js for code block highlight.
- Mathjax for math support.
- tsup for typescript compile and bundle.
*/

/**
 *
 * # mm-mark
 *
 * ## Convert Markdown to HTML
 *
 *  Convert Md to Html with my own Prism.js code highlight and Mathjax extenstions of Showdown.Js.
 *
 * ```ts
 * import Mmmark from "mm-mark"
 * 
 * const markdown = `
      ---
      title: hello world
      date: 2024-07-07
      tags:
          - foo
          - bar
      ---


      ## Hello

      `;

   const html = Mmmark.converter(markdown).html;
   const metadata = Mmmark.converter(markdown).metadata;

   console.log(html) // <h2>Hello</h2>
   console.log(metadata) 
  
  `
  {
    title: 'hello world',
    date: 2024-07-07T00:00:00.000Z,
    tags: [ 'foo', 'bar' ]
  }
  
  `
 * 
 * ```
 *
 */

namespace Mmmark {
  interface DataProps {
    lines: string[];
    metaIndices: number[];
  }
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

  const emptyObject: Record<string, unknown> = {};
  /**
   * Retrieves and loads data from the provided lines based on the metaIndices.
   *
   * @param linesPros - An object containing lines and metaIndices.
   * @returns The loaded data or an empty object if metaIndices are empty.
   */
  function getData(linesPros: DataProps) {
    const { lines, metaIndices } = linesPros;
    if (metaIndices.length > 0) {
      const data = lines.slice(metaIndices[0] + 1, metaIndices[1]);

      return load(data.join("\n"));
    }
    return emptyObject;
  }

  /**
   *
   * @param {DataProps} linesPros - lines and meta indices of markdown file
   * @returns {string} - content of markdown file
   */
  function getContent(linesPros: DataProps): string {
    const { lines, metaIndices } = linesPros;
    return metaIndices.length > 0
      ? lines.slice(metaIndices[1] + 1).join("\n")
      : lines.join("\n");
  }

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
   *
   */

  export function frontmatter(contents: string) {
    const lines = contents.split("\n");
    const metaIndices = lines.reduce(findMetaIndices, [] as number[]);
    const data = getData({ lines, metaIndices });
    const content = getContent({ lines, metaIndices });

    return { data, content };
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

  type Theme =
    | "actom-dark"
    | "cb"
    | "coldark-dark"
    | "dark"
    | "holi-theme"
    | "duotone-earth"
    | "duotone-forest"
    | "duotone-light"
    | "duotone-sea"
    | "duotone-space"
    | "funky"
    | "ghcolors"
    | "gruvbox-light"
    | "laserwave"
    | "lucario"
    | "night-owl"
    | "okaidia"
    | "one-dark"
    | "one-light"
    | "solarized-dark-atom"
    | "synthwave84"
    | "tomorrow"
    | "twilight"
    | "vs"
    | "vsc-dark-plus"
    | "z-touch";

  /**
   * Converts the given content from markdown to HTML using Showdown library with specified options and Prism theme.
   *
   * @param content The markdown content to be converted to HTML.
   * @param prismThemes The Prism theme to be applied to code blocks (default is "okaidia").
   * @returns An object containing the metadata extracted from frontmatter, the generated HTML content,
   *          functions to add and use Showdown extensions, and a function to get the metadata format.
   */
  export const converter = (
    content: string,
    prismThemes: Theme = "okaidia"
  ) => {
    try {
      const convert = new Showdown.Converter({
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tables: true,
        tasklists: true,
        openLinksInNewWindow: true,
        emoji: true,
        moreStyling: true,
        extensions: [
          showdownMathjax,
          showdownPrism({
            languages: [
              "python",
              "py",
              "typescript",
              "ts",
              "yaml",
              "yml",
              "toml",
              "sass",
              "scss",
              "rust",
              "ruby",
              "rb",
              "jsx",
              "tsx",
              "php",
              "markdown",
              "md",
              "latex",
              "tex",
              "haskell",
              "hs",
              "json",
              "asciidoc",
              "adoc",
              "bash",
              "shell",
              "c",
              "csharp",
              "cs",
              "dotnet",
              "cpp",
              "java",
            ],
            theme: prismThemes,
          }),
        ],
      });
      convert.setFlavor("github");
      const { data: metadata, content: markdownContent } = frontmatter(content);
      const html = createHtmlWrapper(convert.makeHtml(markdownContent));
      const addExtension = (
        extension:
          | (() => Showdown.ShowdownExtension[] | Showdown.ShowdownExtension)
          | Showdown.ShowdownExtension[]
          | Showdown.ShowdownExtension,
        name?: string
      ) => convert.addExtension(extension, name);
      const useShowdownExtension = (extensionName: string) =>
        convert.useExtension(extensionName);
      const getMetadataFormat = () => convert.getMetadataFormat();

      return {
        metadata,
        html,
        addExtension,
        useShowdownExtension,
        getMetadataFormat,
      };
    } catch (error) {
      console.error("Error during conversion:", error);
      return {
        metadata: {},
        html: "",
        addExtension: () => {},
        useShowdownExtension: () => {},
        getMetadataFormat: () => {},
      };
    }
  };
}

export default Mmmark;
