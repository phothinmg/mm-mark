import Converter from "./dist/index.js";
import fs from "fs";
const md = new Converter("./hero.md");

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ptm-converter</title>
  </head>
  <body>
   ${md.postHtml}
   
   
  </body>
</html>
`;

fs.writeFileSync("index.html", html);
