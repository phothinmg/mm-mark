import { ShowdownExtension } from "showdown";
import { _registerExtension } from "../manage-extensions/index.js";

/**
 *
 * This extension was inspired by
 *
 * https://www.npmjs.com/package/showdown-custom-class
 *
 * **Showdown Custom Class Extension**
 *
 *
 * _**Recommended to set `true` for option `noHeaderId` when using customClass extension.**_
 *
 * @example
 *
 * ```ts
 * import { mdConverter } from "mm-mark";
 * import { customClass } from "mm-mark/extensions";
 *
 * const converter = mdConverter({
 *   noHeaderId: true,// recommended to set `true` for option `noHeaderId` when using customClass extension
 *   extensions: [customClass],
 *  });
 * const md = `#[.header]Header`;
 * const html = converter.makeHtml(md);
 * console.log(html); // <h1 class="header">Header</h1>
 * ```
 *
 */
function customClass(): ShowdownExtension[] {
  return [
    {
      type: "output",
      filter: (text) => {
        return (
          text
            // Add class for list (ol, ul)
            .replace(
              /<p>\[\.([a-z0-9A-Z\s]+)\]<\/p>[\n]?<(.+)>/g,
              `<$2 class="$1">`
            )

            // Add class for other blocks
            .replace(/<(.+)>\[\.([a-z0-9A-Z\s]+)\]/g, `<$1 class="$2">`)

            // Prevent class name with 2 dashs being replace by `<em>` tag
            .replace(/class="(.+)"/g, (str) => {
              if (str.indexOf("<em>") !== -1) {
                return str.replace(/<[/]?em>/g, "_");
              }
              return str;
            })
        );
      },
    },
  ];
}
_registerExtension("customClass", customClass());

export default customClass;
