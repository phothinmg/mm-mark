/**
 * Type definition for DataProps.
 *
 * @property {any} lines - The lines property of DataProps.
 * @property {any} metaIndices - The metaIndices property of DataProps.
 */
export interface DataProps {
	lines: string[];
	metaIndices: number[];
}

/**
 * Type definition for FrontMatter.
 *
 * @property {Record<string, unknown>} data - The data associated with the front matter.
 * @property {string} content - The content of the front matter.
 */
export interface FrontMatter {
	data: Record<string, unknown>;
	content: string;
}

/**
 * Type definition for MmmarkOptions.
 *
 * @property {string} theme - The theme for Mmmark.
 * @property {string[]} languages - The supported languages for Mmmark.
 */
export interface MmmarkOptions {
	theme?: string;
	languages?: string[];
}

/**
 * Type definition for RenderOptions.
 *
 * @property {string} text - The input text.
 * @property {MmmarkOptions} mmOptions - Optional configuration options for the Mmmark converter.
 * @property {boolean} metadata - Flag indicating whether to include metadata in the rendered HTML.
 */
export type RenderOptions = {
	text: string;
	prismOptions?: MmmarkOptions;
	metadata?: boolean;
};
