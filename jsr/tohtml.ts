import Showdown from "showdown";
import { type MmConverter, getOptions } from "./default.js";
import { FrontMatter, type FrontMatterResult } from "./frontmatter.js";

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
  get data(): FrontMatterResult<T>["data"] {
    return this.yamldata;
  }
  get html(): string {
    return this.makeHtml(this.content);
  }
}
