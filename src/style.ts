import Showdown, { ShowdownExtension } from "showdown";

export const style: ShowdownExtension = {
  type: "output",
  filter: (text) => {
    const styleTag = `
    <style>
    @import url("https://cdn.jsdelivr.net/gh/phothinmg/burmese-fonts@main/dist/028/index.css");
    @import url("https://cdn.jsdelivr.net/gh/phothinmg/burmese-fonts@main/prism/prism.css");
    @import url("https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-holi-theme.css");
    #mm-mark {
      font-family: burmese-028 !important;
      font-weight: 400;
      }
    </style>
    `;
    return styleTag + text;
  },
};

export const script: ShowdownExtension = {
  type: "output",
  filter: (text) => {
    const scriptTag = `
    <script src="https://cdn.jsdelivr.net/gh/phothinmg/burmese-fonts@main/prism/prism.js"></script>
    `;
    return scriptTag + text;
  },
};




