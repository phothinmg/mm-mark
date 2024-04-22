import Converter from "./dist/index.mjs";
import fs from "fs";
const md = new Converter("./hero.md");

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ptm-converter</title>
    <style>
    @import url("https://cdn.jsdelivr.net/gh/phothinmg/burmese-fonts@main/dist/028/index.css");
    @import url("https://cdn.jsdelivr.net/gh/phothinmg/burmese-fonts@main/prism/prism.css");
    @import url("https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-holi-theme.css");
    #mm-mark {
      font-family: burmese-028 !important;
      font-weight: 400;
      }
    </style>
  </head>
  <body>
   ${md.pageHtml}
   
   <script src="https://cdn.jsdelivr.net/gh/phothinmg/burmese-fonts@main/prism/prism.js"></script>
  </body>
</html>
`;

fs.writeFileSync("index.html", html);
