import { mdConverter } from "./src/index.js";
import { icons } from "./src/extensions/index.js";

const converter = mdConverter({
  extensions: [icons],
});

const md = `@fa-home`;
const html = converter.makeHtml(md);
console.log(html); // <i class="fa fa-home"></i>
