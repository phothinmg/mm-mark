import Showdown from "showdown";
import { type MmExtension } from "../manage-extensions/index.js";
import {
  type MmmarkConverterOptions,
  type MmmarkUserSelectOptions,
  getAllOptions,
} from "../helper/getalloptions.js";
import htmlDoc, { type HtmlOptions } from "../helper/template.js";
type MdConverter = {
  makeHtml: (text: string) => string;
  completeHtmlDocument: (text: string, options?: HtmlOptions) => string;
  getOptions: () => MmmarkConverterOptions;
  listen: (
    name: string,
    callback: Showdown.EventListener
  ) => Showdown.Converter;
  addExtension(
    extension:
      | (() => MmExtension[] | MmExtension)
      | MmExtension[]
      | MmExtension,
    name?: string
  ): void;
  useExtension(extensionName: string): void;
  removeExtension(extensions: MmExtension[] | MmExtension): void;
};

/**
 * **Create a Showdown converter**
 *
 * @param options - Optional custom options to override the default settings.
 * @returns A new Showdown converter.
 */
function mdConverter(options?: MmmarkUserSelectOptions): MdConverter {
  const opts: MmmarkConverterOptions = getAllOptions(options);
  const converter: Showdown.Converter = new Showdown.Converter(opts);
  /**
   * **Make HTML from markdown text**
   *
   * @param text - The markdown text to convert.
   * @returns The converted HTML text.
   *
   * If `sanitize` option is set to `true`, the output will be sanitized.
   */
  const makeHtml = (text: string): string => {
    const html = converter.makeHtml(text);
    return html;
  };
  /**
   * **Make a complete HTML document from markdown text**
   *
   * @param text - The markdown text to convert.
   * @param options - Optional options for the HTML document.
   * @returns The complete HTML document.
   *
   * This will first convert the markdown text to HTML using the `makeHtml` function,
   * and then wrap the resulting HTML in a complete HTML document using the
   * `htmlDoc` function.
   */
  const completeHtmlDocument = (
    text: string,
    options?: HtmlOptions
  ): string => {
    const htmlContent: string = makeHtml(text);
    return htmlDoc(htmlContent, options);
  };
  /**
   * **Get the current options**
   *
   * @returns The current options for this converter.
   */
  const getOptions = (): MmmarkConverterOptions => {
    return opts;
  };
  /**
   * **Listen to a showdown event**
   *
   * @param name - The name of the event to listen to.
   * @param callback - The callback function to call when the event occurs.
   * @returns The converter instance.
   *
   * This will listen to the specified event on the converter and call the
   * provided callback when it occurs.
   *
   * The available events are:
   *
   * - `beforeConversion`
   * - `afterConversion`
   * - `beforeInline`
   * - `afterInline`
   * - `beforeBlock`
   * - `afterBlock`
   * - `beforeOutput`
   * - `afterOutput`
   */
  const listen = (
    name: string,
    callback: Showdown.EventListener
  ): Showdown.Converter => {
    try {
      return converter.listen(name, callback);
    } catch (error) {
      console.error("Error adding event listener:", error);
      return converter;
    }
  };
  /**
   * **Add a showdown extension**
   *
   * @param extension - The extension to add.
   * @param name - The name of the extension.
   * @returns The converter instance.
   *
   * This will add the specified extension to the converter.
   *
   * The available extensions are:
   *
   * - The [Showdown built-in extensions](https://github.com/showdownjs/showdown/wiki/Extensions)
   * - The [Mmark built-in extensions](https://github.com/ptmdev/mm-mark#extensions)
   */
  const addExtension = (
    extension:
      | (() => MmExtension[] | MmExtension)
      | MmExtension[]
      | MmExtension,
    name?: string
  ): void => {
    try {
      return converter.addExtension(extension, name);
    } catch (error) {
      console.error("Error adding extension:", error);
      return;
    }
  };
  /**
   * **Use a showdown extension**
   *
   * @param extensionName - The name of the extension to use.
   * @returns The converter instance.
   *
   * This will use the specified extension on the converter.
   *
   * The available extensions are:
   *
   * - The [Showdown built-in extensions](https://github.com/showdownjs/showdown/wiki/Extensions)
   * - The [Mmark built-in extensions](https://github.com/ptmdev/mm-mark#extensions)
   */
  const useExtension = (extensionName: string): void => {
    try {
      return converter.useExtension(extensionName);
    } catch (error) {
      console.error("Error using extension:", error);
      return;
    }
  };
  /**
   * **Remove a showdown extension**
   *
   * @param extensions - The extension(s) to remove.
   * @returns The converter instance.
   *
   * This will remove the specified extension(s) from the converter.
   *
   * The available extensions are:
   *
   * - The [Showdown built-in extensions](https://github.com/showdownjs/showdown/wiki/Extensions)
   * - The [Mmark built-in extensions](https://github.com/ptmdev/mm-mark#extensions)
   */
  const removeExtension = (extensions: MmExtension[] | MmExtension) => {
    return converter.removeExtension(extensions);
  };
  return {
    makeHtml,
    completeHtmlDocument,
    getOptions,
    listen,
    addExtension,
    useExtension,
    removeExtension,
  };
}

export { mdConverter, type MdConverter };
