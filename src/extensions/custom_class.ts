import {
  registerExtension,
  type MmExtension,
} from "../manage-extensions/index.js";

/**
 *
 * This extension was inspired by
 *
 * https://www.npmjs.com/package/showdown-custom-class
 *
 * Showdown Custom Class Extension
 *
 *
 * @example
 *
 * ```js
 * var converter = new showdown.Converter({
 *  extensions: [customClassExt],
 *  })
 * ```
 *
 * ---
 *
 * <br>
 *
 * ```md
 * #[.header]Header
 * [.pTag line]Just a line of text.
 * ```
 * <br>
 *
 * ---
 *
 * <br>
 *
 * ```html
 * <h1 id="headercontenttitle" class="header">Header</h1>
 * <p class="pTag line">Just a line of text.</p>
 * ```
 *
 *
 * @returns {MmExtension[]}
 */
function customClass(): MmExtension[] {
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
            .replace(/class="(.+)"/g, function (str) {
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
registerExtension("customClass", customClass());

export default customClass;
