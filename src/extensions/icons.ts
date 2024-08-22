import {
  registerExtension,
  type MmExtension,
} from "../manage-extensions/index.js";

/**
 * Font Awesome icons extension for Mmark and Showdown
 *
 * https://github.com/dbtek/showdown-icon/blob/master/showdown-icon.js
 *
 *
 * @returns {MmExtension[]}
 *
 * ```js
 * var converter = new Showdown.converter({ extensions: ['icons'] });
 * alert(converter.makeHtml('@fa-home'));
 * ```
 */
function icons(): MmExtension[] {
  return [
    {
      type: "lang",
      regex: "\\B(\\\\)?@fa-([\\S]+)\\b",
      replace: function (a: any, b: string, c: string) {
        return b === "\\" ? a : '<i class="fa fa-' + c + '">' + "</i>";
      },
    },
    {
      type: "output",
      filter: (text: string) => {
        const scriptTag = `
        <script>
        var script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/50c925d5df.js";
        script.crossorigin = "anonymous";
        document.head.appendChild(script);
        </script>`;
        return scriptTag + text;
      },
    },
  ];
}

registerExtension("icons", icons());

export default icons;
