import Showdown from "showdown";
import { frontmatter, type FrontMatterResult } from "./frontmatter.ts";
import type {
  Converter,
  ConverterOptions,
  EventListener,
  Flavor,
  MmExtension,
  MmmarkOptions,
  ShowdownConverterExtensions,
  ShowdownConvertOptions,
  ShowdownExtension,
} from "./converter-types.ts";
import { getAllOptions } from "./getalloptions.ts";

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
class MarkdownConverter<T> {
  private md: FrontMatterResult<T>;
  private yamldata: T;
  private content: string;
  private opts: ConverterOptions | undefined;
  private converter: Converter;
  private firstOpts: ShowdownConvertOptions;
  constructor(mdcontent: string, options?: ConverterOptions) {
    this.md = frontmatter<T>(mdcontent);
    this.yamldata = this.md.data;
    this.content = this.md.content;
    this.opts = options;
    this.firstOpts = getAllOptions(this.opts);
    this.converter = this.convert();
  }
  private convert(): Converter {
    return new Showdown.Converter(this.firstOpts);
  }
  /**
   * Listen to an event.
   *
   * @param name - The event name.
   * @param callback - The function that will be called when the event occurs.
   * @throws Throws if the type of `name` is not string.
   * @throws Throws if the type of `callback` is not function.
   * @example
   * ```ts
   * let converter: Converter = new Converter();
   * converter
   *   .listen('hashBlock.before', (evtName, text, converter, options, globals) => {
   *     // ... do stuff to text ...
   *     return text;
   *   })
   *   .makeHtml('...');
   * ```
   */
  listen(name: string, callback: EventListener): Converter {
    return this.converter.listen(name, callback);
  }
  /**
   * Set a "local" flavor for THIS instance.
   *
   * @param flavor - The flavor name.
   */
  setFlavor(name: Flavor): void {
    return this.converter.setFlavor(name);
  }
  /**
   * Get the options of this Converter instance.
   *
   * @returns Returns the current convertor options object.
   */
  getOptions(): MmmarkOptions {
    return this.converter.getOptions();
  }
  /**
   * Add extension to THIS converter.
   *
   * @param extension - The new extension to add.
   * @param name - The extension name.
   */
  addExtension(extension: MmExtension): void {
    return this.converter.addExtension(extension);
  }
  /**
   * Use a global registered extension with THIS converter.
   *
   * @param extensionName - Name of the previously registered extension.
   */
  useExtension(extensionName: string): void {
    return this.converter.useExtension(extensionName);
  }

  /**
   * Converts an HTML string into a markdown string.
   *
   * @param src - The input text (HTML)
   * @param [HTMLParser] A WHATWG DOM and HTML parser, such as JSDOM. If none is supplied, window.document will be used.
   * @returns The output markdown.
   */
  makeMarkdown(src: string, HTMLParser?: any): string {
    return this.converter.makeMarkdown(src, HTMLParser);
  }
  /**
   * Remove an extension from THIS converter.
   *
   * @remarks This is a costly operation. It's better to initialize a new converter.
   * and specify the extensions you wish to use.
   * @param extensions - The extensions to remove.
   */
  removeExtension(extensions: ShowdownExtension[] | ShowdownExtension): void {
    return this.converter.removeExtension(extensions);
  }
  /**
   * Get all extensions.
   *
   * @return all extensions.
   */
  getAllExtensions(): ShowdownConverterExtensions {
    return this.converter.getAllExtensions();
  }
  get data(): T {
    return this.yamldata;
  }
  get html(): string {
    return this.converter.makeHtml(this.content);
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
  options?: ConverterOptions
): MarkdownConverter<T> {
  return new MarkdownConverter<T>(mdcontent, options);
}
