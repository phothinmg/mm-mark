import { type MmConverter, getOptions } from "./default.js";
import Showdown from "showdown";
import { FrontMatter, type FrontMatterResult } from "./frontmatter.js";

export namespace Mmmark {
  /**
   * **Showdown Converter**
   *
   * **Options**
   *
   * The following options are already set to `true`
   *  -  emoji
   *  -  ghCodeBlocks
   *  -  parseImgDimensions
   *  -  simplifiedAutoLink
   *  -  table
   *  -  tasklists
   *
   * More information about options;
   * @see https://github.com/showdownjs/showdown#options
   */
  export class ConvertMd<T> extends Showdown.Converter {
    private md: FrontMatterResult<T>;
    private yamldata: T;
    private content: string;

    constructor(mdcontent: string, options?: MmConverter) {
      super(getOptions(options));
      this.md = new FrontMatter(mdcontent).frontmatter<T>();
      this.yamldata = this.md.data;
      this.content = this.md.content;
    }
    get data(): T {
      return this.yamldata;
    }
    get html(): string {
      return this.makeHtml(this.content);
    }
  }

  /**
   * **Convert  Markdown to Html with Showdown js.**
   * 
   * ---
   * 
   * 
   *  **Options**
   * 
   * `Showdown.ConverterOptions`
   *
   * The following options are already set to `true`
   *  -  emoji
   *  -  ghCodeBlocks
   *  -  parseImgDimensions
   *  -  simplifiedAutoLink
   *  -  table
   *  -  tasklists
   *
   * More information about options -
   * @see https://github.com/showdownjs/showdown#options
   * 
   * 
   * ---
   * 
   * **Showdown Extension**
   * 
   * Using Extension
   * 
   * You can add any showdown extensions to the `options.extensions`.
   * 
   * 
   * Create Extension
   * 
   * @see https://github.com/showdownjs/showdown/wiki/extensions
   * 
   * Extension Boilerplate
   * 
   * @see https://github.com/showdownjs/extension-boilerplate
   * 
   * 
   * ---
   * 
   * 
   * @example
   * 
   * ```ts
    
        type MyType = { // types for frontmatter yaml data
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

        const foo = Mmmark.converter<MyType>(mdcontent, {
        backslashEscapesHTMLTags: true,
        extensions:[// You can add any showdown extensions]
        });
        foo.setFlavor("github") // Set flavor for this converter 
        console.log(foo.data); // { title: 'hello world',  date: 2024-07-07T00:00:00.000Z, tags: [ 'foo', 'bar' ] }
        console.log(foo.html); // <h2 id="hello">Hello</h2>

   * ```
   */
  export function converter<T>(
    mdcontent: string,
    options?: MmConverter
  ): ConvertMd<T> {
    return new ConvertMd<T>(mdcontent, options);
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
    return new FrontMatter(content).frontmatter();
  }
}

export type { MmConverter, FrontMatterResult };
