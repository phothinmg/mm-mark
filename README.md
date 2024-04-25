## Markdown to HTML Converter

![md-html](https://miro.medium.com/v2/resize:fit:1400/1*eZ7YPTqzcyFVoQxIOIQ9kQ.png)

---
### About

Markdown to HTML converter using [Showdown](https://github.com/showdownjs/showdown).

---

### Install 

#### NPM

https://www.npmjs.com/package/mm-mark

**Node.Js**

```bash
npm i mm-mark
```

```bash
yarn add mm-mark
```

```bash
pnpm i mm-mark
```
#### [JSR](https://jsr.io/)

[![JSR](https://jsr.io/badges/@ptm/mm-mark)](https://jsr.io/@ptm/mm-mark) [![JSR Score](https://jsr.io/badges/@ptm/mm-mark/score)](https://jsr.io/@ptm/mm-mark)

https://jsr.io/@ptm/mm-mark

**Deno**

```bash
deno add @ptm/mm-mark
```

```js
import * as mod from "@ptm/mm-mark";
```
**Bun**

```bash
bunx jsr add @ptm/mm-mark
```

```js
import * as mod from "@ptm/mm-mark";
```

Available at https://www.webjars.org/, but just experimental.

---
### Usage

`example.md`

```markdown
---
title: 'Example'
date: '2023-08-20'
---

# Home 

Hello World

<div style="color: red;">Hello World</div>

```

---

### `data`

Object : return metadata of markdown file.

```javascript

import Converter from "mm-mark";

const mdContent = new Converter('./example.md');

const data = mdContent.data;
console.log(data);
// { title: 'Example', date: '2023-08-20' }
const title = mdContent.postTitle;
console.log(title);
// Example
const date = mdContent.postDate;
console.log(date);
// Sun, Aug 20, 2023 - return formated date
const dat = mdContent.data.date;
console.log(dat);
// 2023-08-20 - return unformated date
```

---

### `content`

```javascript

import Converter from "mm-mark";

const mdContent = new Converter('./example.md');

const content = mdContent.content;
console.log(content);
/*# Home 

Hello World

<div style="color: red;">Hello World</div>
 */

const convertedContent = mdContent.convertedContent;
console.log(convertedContent);
/*<h1 id="home">Home</h1>
<p>Hello World</p>
<div style="color: red;">Hello World</div>*/

const pageHtml = mdContent.pageHtml;
console.log(pageHtml);
// Return html with hightlight js , copy button to <pre> for page content

const postHtml = mdContent.postHtml;
console.log(postHtml);
// Return html with hightlight js , copy button to <pre> for post content
// include - post title , reading time , last update
```
---

### `json`

```javascript

import Converter from "ptm-converter";

const mdContent = new Converter('./example.md');

const json = mdContent.json;
console.log(json);

/*{
    "data":{
    "title":"Home",
    "date":"2023-08-18"
    },
    "content":"\n# Home \n\nHello World\n\n<div style=\"color: red;\">Hello World</div>\n\n"
}*/

```

---

### `function`

```javascript
import Converter from "ptm-converter";

const formatedDate = new Converter().formatDate('2023-09-11');
console.log(formatedDate);
// Mon, Sep 11, 2023

const readingTime = new Converter().readingTime(text);
console.log(readingTime)
// Return in minutes {number}

const lastUpdate= new Converter('./example.md').lastUpdate();
console.log(lastUpdate);
// 2023-10-22T20:22:04.000Z

```
---










