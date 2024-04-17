import Showdown, { ShowdownExtension } from "showdown";

function mathjax(): ShowdownExtension[] {
  const ext: ShowdownExtension[] = [
    {
      type: "lang",
      filter: (text: string) => {
        return text.replace(/\\\((.*?)\\\)/g, (match, p1) => {
          return (
            "<mathxxxjax>" +
            encode("\\(" + escapehtml(p1) + "\\)") +
            "</mathxxxjax>"
          );
        });
      },
    },
    {
      type: "lang",
      filter: (text: string) => {
        return text.replace(/\\\[([\s\S]*?)\\\]/g, (match, p1) => {
          return (
            "<mathxxxjax>" +
            encode("\\[" + escapehtml(p1) + "\\]") +
            "</mathxxxjax>"
          );
        });
      },
    },
    {
      type: "output",
      filter: (text: string) => {
        return text.replace(/<mathxxxjax>(.*?)<\/mathxxxjax>/g, (match, p1) => {
          return decode(p1);
        });
      },
    },
    {
      type: "output",
      filter: (text: string) => {
        const scriptTag = `
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
          <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        `;
        return scriptTag + text;
      },
    },
  ];
  return ext;
}

function escapehtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function encode(text: string) {
  if (typeof Buffer === "function") {
    return Buffer.from(text).toString("base64");
  } else {
    return btoa(text);
  }
}
function decode(text: string) {
  if (typeof Buffer === "function") {
    return Buffer.from(text, "base64").toString();
  } else {
    return atob(text);
  }
}

Showdown.extensions.mathjax = mathjax();

export default mathjax;
