import {
  type MmExtension,
  registerExtension,
} from "../manage-extensions/index.js";

/**
 * **Font Awesome icons extension for Mmark and Showdown**
 *
 * https://github.com/dbtek/showdown-icon/blob/master/showdown-icon.js
 *
 *
 * @example
 * 
 * ```ts
 * import { mdConverter } from "mm-mark";
	import { customClass } from "mm-mark/extensions";

	const converter = mdConverter({
	extensions: [icons],
	});

	const md = `@fa-home`;
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
      replace: (match: string, escaped: string, iconName: string) =>
        escaped === "\\" ? match : `<i class="fa fa-${iconName}"></i>`,
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
        const scriptTag = `
            <script>
            if (!document.querySelector('script[src="https://kit.fontawesome.com/50c925d5df.js"]')) {
              var script = document.createElement("script");
              script.src = "https://kit.fontawesome.com/50c925d5df.js";
              script.integrity = "sha384-WnvjC3a7qACGW44G0spmbF1u7E+79pf/6LDK0JFS0lM6c03E3R7LrO/YBeGBJ1lW";
              script.crossOrigin = "anonymous";
              document.head.appendChild(script);
            }
            </script>`;
        text = text.replace(/<p>(<i class="fa fa-[^"]+"><\/i>)<\/p>/g, "$1");
        return `${text}\n${scriptTag}`;
      },
    },
  ];
}

registerExtension("icons", icons());

export default icons;
