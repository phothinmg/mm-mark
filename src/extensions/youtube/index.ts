import Mmmark from "../../index.js";

/**
 * This extension was inspired by
 *
 * https://github.com/SH20RAJ/showdown-extensions/blob/main/dist/youtube/index.js
 *
 * Showdown Youtube Extension
 *
 * @returns {Mmmark.ShowdownExtension[]}
 *
 * @example
 *
 * ```md
 * {% youtube https://youtu.be/0d6tf4te4lw %}
 * ```
 *
 */
function showdownYoutube(): Mmmark.ShowdownExtension[] {
  return [
    {
      type: "lang",
      regex: /{% youtube (.+?) %}/g,
      replace: function (match: any, url: string) {
        const videoId = url.split("v=")[1] || url.split("/").pop();
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      },
    },
  ];
}

Mmmark.registerExtension("showdownYoutube", showdownYoutube());

export default showdownYoutube;
