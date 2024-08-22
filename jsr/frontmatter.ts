import { load } from 'js-yaml'

interface DataProps {
	lines: string[]
	metaIndices: number[]
}
export interface FrontMatterResult<T> {
	/**
	 *  Yaml data form a markdown files
	 */
	data: T
	/**
	 * Body content of markdown file
	 */
	content: string
}

/**
 * Class for parsing front matter from a markdown content string.
 * Parses metadata and content from markdown content based on metadata delimiters.
 */
class FrontMatter {
	private mdcontent: string
	constructor(mdcontent: string) {
		this.mdcontent = mdcontent
	}
	private findMetaIndices(mem: number[], item: string, i: number): number[] {
		// If the line starts with ---, it's a metadata delimiter
		if (/^---/.test(item)) {
			// Add the index of the line to the array of indices
			mem.push(i)
		}

		return mem
	}
	private getData<T>(linesPros: DataProps): FrontMatterResult<T>['data'] {
		const { lines, metaIndices } = linesPros
		if (metaIndices.length > 0) {
			const data = lines.slice(metaIndices[0] + 1, metaIndices[1])

			return load(data.join('\n')) as T
		}
		return {} as T
	}
	private getContent(linesPros: DataProps): string {
		const { lines, metaIndices } = linesPros
		return metaIndices.length > 0
			? lines.slice(metaIndices[1] + 1).join('\n')
			: lines.join('\n')
	}
	frontmatter<T>(): FrontMatterResult<T> {
		const lines = this.mdcontent.split('\n')
		const metaIndices = lines.reduce(this.findMetaIndices, [] as number[])
		const data: T = this.getData({ lines, metaIndices })
		const content: string = this.getContent({ lines, metaIndices })

		return { data, content }
	}
}
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
    type MyType = {
      type: string;
      title: string;
    };

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

    const foo = frontmatter<MyType>(mdcontent);
    console.log(foo.data); // { title: 'hello world',  date: 2024-07-07T00:00:00.000Z, tags: [ 'foo', 'bar' ] }
    console.log(foo.content); // ## Hello
 *
 * ```
 *
 */
export function frontmatter<T>(content: string): FrontMatterResult<T> {
	return new FrontMatter(content).frontmatter()
}
