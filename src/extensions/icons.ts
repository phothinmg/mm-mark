import {
  registerExtension,
  type MmExtension,
} from "../manage-extensions/index.js";
/**
 * **Font Awesome icons extension for Mmmark and Showdown**
 *
 * https://github.com/dbtek/showdown-icon/blob/master/showdown-icon.js
 *
 * 
 * 
 * 
 * Add this link to `<head>` of your HTML.
 * 
 * ```html
 * <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
 * ```
 * <br>
 * ---
 * 
 * <br>
 * 
 * **Example**
 * 
 * ```ts
 * import { mdConverter } from "mm-mark";
	import { customClass } from "mm-mark/extensions";

	const converter = mdConverter({
	extensions: [icons],
	});

	const md = `@fa-home`;// also you can use <i class="fa fa-home"></i>
	const html = converter.makeHtml(md);
	console.log(html); // <i class="fa fa-home"></i>
 * ```
 * 
 */
function icons(): MmExtension[] {
  return [
    {
      type: "lang",
      regex: "\\B(\\\\)?@fa-([\\S]+)\\b",
      /**
       * Replace the matched text with either the original text or
       * an `<i>` element with the correct font awesome icon class.
       *
       * @param match The entire matched text.
       * @param escaped The escaped prefix of the match, if any.
       * @param iconName The name of the icon without the `fa-` prefix.
       * @returns The replaced text.
       */
      replace: (match: string, escaped: string, iconName: string) => {
        return escaped === "\\" ? match : `<i class="fa fa-${iconName}"></i>`;
      },
    },
    {
      type: "output",
      /**
       * Replace any `<p>` elements containing only a font awesome icon
       * with just the icon.
       *
       * Also, add a script tag to the output to import the font awesome
       * library unless the library has already been imported.
       *
       * @param text The text to filter.
       * @returns The filtered text.
       */
      filter: (text: string) => {
        if (text) {
          text = text.replace(/<p>(<i class="fa fa-[^"]+"><\/i>)<\/p>/g, "$1");
        }
        return text;
      },
    },
  ];
}

registerExtension("icons", icons());

export default icons;
