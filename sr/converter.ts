// import Showdown, {
//   type Converter,
//   type Flavor,
//   type ShowdownExtension,
//   type EventListener,
// } from "showdown";
// import { type FrontMatterResult, frontmatter } from "./frontmatter/index.js";
// import {
//   type MmmarkConverterOptions,
//   type MmmarkUserSelectOptions,
//   getAllOptions,
// } from "./helper/getalloptions.js";

// type Mmextension = ShowdownExtension;
// type MmFlavor = Flavor;


// class MmmarkConverter<T> {
//   private readonly _opts: MmmarkConverterOptions;
//   private _md: FrontMatterResult<T>;
//   private _content: string;
//   private _converter: Converter;
//   data: T;
//   html: string;
//   constructor(mdcontent: string, options?: MmmarkUserSelectOptions) {
//     if (!mdcontent) {
//       throw new Error("Markdown content cannot be empty");
//     }
//     this._opts = Object.freeze(getAllOptions(options));
//     this._md = frontmatter<T>(mdcontent);
//     /**
//      * Converted HTML form markdown
//      */
//     this.data = this._md.data;
//     this._content = this._md.content;
//     this._converter = new Showdown.Converter(this._opts);
//     /**
//      * YAML Frontmatter data from Markdown
//      *
//      * Between --- and ---
//      */
//     this.html = this._converter.makeHtml(this._content);
//   }
//   /**
//    * Listen to an event.
//    *
//    * @param name - The event name.
//    * @param callback - The function that will be called when the event occurs.
//    * @throws Throws if the type of `name` is not string.
//    * @throws Throws if the type of `callback` is not function.
//    * @example
//    * ```ts
//    * let converter: Converter = new Converter();
//    * converter
//    *   .listen('hashBlock.before', (evtName, text, converter, options, globals) => {
//    *     // ... do stuff to text ...
//    *     return text;
//    *   })
//    *   .makeHtml('...');
//    * ```
//    */
//   listen(name: string, callback: EventListener): Converter {
//     if (typeof name !== "string" || typeof callback !== "function") {
//       throw new TypeError("Invalid arguments");
//     }
//     return this._converter.listen(name, callback);
//   }
//   /**
//    * Set a "local" flavor for THIS Converter instance.
//    *
//    * @param flavor - The flavor name.
//    */
//   setFlavor(name: Flavor): void {
//     this._converter.setFlavor(name);
//   }
//   /**
//    * Add extension to THIS converter.
//    *
//    * @param extension - The new extension to add.
//    * @param name - The extension name.
//    */
//   addExtension(extension: Extension, name?: string): void {
//     this._converter.addExtension(extension, name);
//   }
//   /**
//    * Use a global registered extension with THIS converter.
//    *
//    * @param extensionName - Name of the previously registered extension.
//    */
//   useExtension(extensionName: string): void {
//     this._converter.useExtension(extensionName);
//   }
//   /**
//    * Remove an extension from THIS converter.
//    *
//    * @remarks This is a costly operation. It's better to initialize a new converter.
//    * and specify the extensions you wish to use.
//    * @param extensions - The extensions to remove.
//    */
//   removeExtension(extensions: ShowdownExtension[] | ShowdownExtension): void {
//     this._converter.removeExtension(extensions);
//   }
// }
// function converter<T>(
//   mdcontent: string,
//   options?: MmmarkUserSelectOptions
// ): MmmarkConverter<T> {
//   return new MmmarkConverter<T>(mdcontent, options);
// }

// function converter(options?: MmmarkUserSelectOptions) {
//   const opts: MmmarkConverterOptions = getAllOptions(options);
//   return new Showdown.Converter(opts);
// }
// export { converter, frontmatter };
// export type {
//   MmmarkUserSelectOptions,
//   Mmextension,
//   MmFlavor,
//   FrontMatterResult,
//   MmmarkConverterOptions,
// };
