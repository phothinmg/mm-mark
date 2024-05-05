import showdown from "showdown";

import fs from "fs";
(function (extension) {
  if (typeof showdown !== "undefined") {
    // global (browser or nodejs global)
    extension(showdown);
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(["showdown"], extension);
  } else if (typeof exports === "object") {
    // Node, CommonJS-like
    module.exports = extension(require("showdown"));
  } else {
    // showdown was not found so we throw
    throw Error("Could not find showdown library");
  }
})(function (showdown) {
  // loading extension into shodown
  showdown.extension("", function () {
    var showdownPrism = {
      type: "output",
      filter: (text, converter, options) => {
        const params = {
          left: "<pre><code\\b[^>]*>",
          right: "</code></pre>",
          flags: "g",
        };
        const replacement = (wholeMatch, match, left, right) => {
          const decodedMatch = decode(match);
          const lang = left.match(/class=\"([^ \"]+)/)?.[1] ?? undefined;
          if (lang) {
            left = `<pre class="language-${lang}"><code class="language-${lang}">`;
            return (
              left +
              Prism.highlight(decodedMatch, Prism.languages[lang], lang) +
              right
            );
          } else {
            return wholeMatch;
          }
        };
        return showdown.helper.replaceRecursiveRegExp(
          text,
          replacement,
          params.left,
          params.right,
          params.flags
        );
      },
    };
    return [showdownPrism];
  });
});
/** @typedef {import("showdown").ShowdownOptions}Options */
/**
 *
 * @param {Options} options
 * @returns
 */
const Converter = (options = {}) => {
  return new showdown.Converter(options);
};
const content = fs.readFileSync("./aa.md", "utf-8");
const con = Converter({
  parseImgDimensions: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: false,
  tasklists: true,
  openLinksInNewWindow: true,
  emoji: true,
  moreStyling: true,
});

con.setFlavor("github");
const cc = con.makeHtml(content);

const temp = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://classless.de/classless.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/phothinmg/prism-themes@v1/ghcolors.min.css">
  </head>
  <body>
 ${cc}
 
  </body>
</html>
`;

fs.writeFileSync("a.html", temp);
