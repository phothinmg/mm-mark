import { load } from "js-yaml";
import Showdown from "showdown";
import showdownAdmonitionBlock from "showdown-admonitionblock";
import showdownMathjax from "showdown-mathjax";
import showdownPrism from "showdown-prism";
import { supportedLanguages } from "./supportedLangs";
import type {
	DataProps,
	FrontMatter,
	MmmarkOptions,
	RenderOptions,
} from "./types";

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
 * @example
 *
 *  import Mmmark from "mm-mark";
 *
 *  const data = Mmmark.getFrontmatter(_markdown_content_).data; // YAML metadata from `.md` file
 *  const content = Mmmark.getFrontmatter(_markdown_content_).data;
 *
 *  const convertedHTML = Mmmark.renderHtml({
 *  text: content,
 *  prismOptions :{ // for syntax highlight
 *    theme?: string, // default "vs", Available Themes can br see at readme.md
 *    languages?: string[]; // Preloaded Languages at readme.md and Supported languages at https://prismjs.com/
 *   },
 *  matadata : boolean; // default `false` , using YAML metadata or not.
 * })
 *
 */

export namespace Mmmark {
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
	 * @returns {FrontMatter} - Object containing the frontmatter data and content.
	 */
	export function frontmatter(contents: string): FrontMatter {
		const lines = contents.split("\n");
		const metaIndices = lines.reduce(findMetaIndices, [] as number[]);
		const data = getData({ lines, metaIndices });
		const content = getContent({ lines, metaIndices });

		return { data, content };
	}

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
			showdownAdmonitionBlock,
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
		text: string,
	): { data: Record<string, unknown>; content: string } => {
		const { data, content } = frontmatter(text);
		return {
			data,
			content,
		};
	};

	function getingContent(Opts: RenderOptions): string {
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
		const content: string = getingContent(opts);
		const cont: Showdown.Converter = converter(opts.prismOptions);
		const html: string = cont.makeHtml(content);
		return createHtmlWrapper(html);
	};
}
