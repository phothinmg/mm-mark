import { load } from "js-yaml";

interface DataProps {
	lines: string[];
	metaIndices: number[];
}
export interface FrontMatterResult<T> {
	/**
	 *  Yaml data form a markdown files
	 */
	data: T;
	/**
	 * Body content of markdown file
	 */
	content: string;
}
/**
 * Class for parsing front matter from a markdown content string.
 * Parses metadata and content from markdown content based on metadata delimiters.
 */
export class FrontMatter {
	private mdcontent: string;
	constructor(mdcontent: string) {
		this.mdcontent = mdcontent;
	}
	/**
 * Finds and returns the indices of lines starting with '---' in the provided content.
 * 
 * @param mem - An array of numbers representing the indices of lines with metadata delimiters.
 * @param item - The current line of content being checked.
 * @param i - The index of the current line in the content.
 * @returns An updated array of indices after checking the current line for metadata delimiters.
 */
	private findMetaIndices(mem: number[], item: string, i: number): number[] {
		// If the line starts with ---, it's a metadata delimiter
		if (/^---/.test(item)) {
			// Add the index of the line to the array of indices
			mem.push(i);
		}

		return mem;
	}
	/**
 * Retrieves and parses data from the provided lines based on metaIndices.
 * 
 * @template T - The type of data to be returned
 * @param linesPros - An object containing lines and metaIndices
 * @returns The parsed data of type T extracted from the lines
 */
	private getData<T>(linesPros: DataProps): FrontMatterResult<T>["data"] {
		const { lines, metaIndices } = linesPros;
		if (metaIndices.length > 0) {
			const data = lines.slice(metaIndices[0] + 1, metaIndices[1]);

			return load(data.join("\n")) as T;
		}
		return {} as T;
	}
	/**
 * Retrieves content based on metaIndices from the provided lines.
 * 
 * @param linesPros - An object containing lines and metaIndices.
 * @returns The content extracted from lines based on metaIndices.
 */
	private getContent(linesPros: DataProps): string {
		const { lines, metaIndices } = linesPros;
		return metaIndices.length > 0
			? lines.slice(metaIndices[1] + 1).join("\n")
			: lines.join("\n");
	}
	/**
 * Retrieves front matter data and content from markdown content.
 * Splits the markdown content into lines, finds metadata indices, and extracts data and content accordingly.
 * @returns An object containing the front matter data and the body content of the markdown file.
 */
	frontmatter<T>(): FrontMatterResult<T> {
		const lines = this.mdcontent.split("\n");
		const metaIndices = lines.reduce(this.findMetaIndices, [] as number[]);
		const data: T = this.getData({ lines, metaIndices });
		const content: string = this.getContent({ lines, metaIndices });

		return { data, content };
	}
}
