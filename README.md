# mm-mark

**_ESM Only_**

![md-html](https://miro.medium.com/v2/resize:fit:1400/1*eZ7YPTqzcyFVoQxIOIQ9kQ.png)

---

## Convert Markdown to HTML

Mmmark : Convert Md to Html with Showdown.Js.

> [!NOTE]
> This package focus on convert markdown to html . If you want more, recommended to use [Showdown.js](https://github.com/showdownjs/showdown)

---

## Main dependencies bundled license information.

### 1. Showdown.js

Showdown.js is a powerful JavaScript library used for converting Markdown into HTML. It's a key dependency in our project, providing the core functionality of our Markdown to HTML conversion.

- Version: 2.1.0
- Release Date: 21-04-2022
- [Showdown.js GitHub](https://github.com/showdownjs/showdown)
- License: MIT

### 2. JS-YAML

JS-YAML is a JavaScript implementation of YAML, a human-friendly data serialization standard. In our project, it's used for parsing YAML front matter in Markdown files.

- Version: 4.1.0
- [JS-YAML GitHub](https://github.com/nodeca/js-yaml)
- License: MIT

### 3. Other dependencies

- Prism.Js for code block highlight.
- Mathjax for math support.
- tsup for typescript compile and bundle.

---

[![npm version](https://badge.fury.io/js/mm-mark.svg)](https://badge.fury.io/js/mm-mark)

### Install from npm

```bash
npm i mm-mark
```

```bash
yarn add mm-mark
```

```bash
pnpm i mm-mark
```

---

[![JSR](https://jsr.io/badges/@ptm/mm-mark)](https://jsr.io/@ptm/mm-mark)

### Install from jsr.io

deno

```bash
deno add @ptm/mm-mark
```

npm

```bash
npx jsr add @ptm/mm-mark
```

yarn

```bash
yarn dlx jsr add @ptm/mm-mark
```

pnpm

```bash
pnpm dlx jsr add @ptm/mm-mark
```

bun

```bash
bunx jsr add @ptm/mm-mark
```

**Import**

```ts
import * as mod from "@ptm/mm-mark";
```

---

### Markdown to HTML.

```ts
import mmmark from "mm-mark";
const mdcontent = `
---
title: hello world
date: 2024-07-07
tags:
    - foo
    - bar
---


## Hello

`;
const converter = mmmark.Converter(/*{Showdown Options} */);
// set flavor for this converter
converter.setFlavor("github");
const html = converter.makeHtml(mdcontent);
console.log(html); // <h2 id="hello">Hello</h2>
```

### Frontmatter

```ts
import mmmark from "mm-mark";
type MyType = {
  type: string;
  title: string;
};

const mdcontent = `
    ---
    title: hello world
    date: 2024-07-07
    tags:
        - foo
        - bar
    ---


    ## Hello

    `;

const foo = mmmark.frontmatter<MyType>(mdcontent);
console.log(foo.data); // { title: 'hello world',  date: 2024-07-07T00:00:00.000Z, tags: [ 'foo', 'bar' ] }
console.log(foo.content); // ## Hello
```

### Extensions

**Available Extensions**

1. `icons`

```ts
import mmmark from "mm-mark";
import { customClass } from "mm-mark";

const converter = mmmark.Converter({
  extensions: [icons],
});

const md = `@fa-home`;
const html = converter.makeHtml(md);
console.log(html); // <i class="fa fa-home"></i>
```

2. `customClass`

```ts
import mmmark from "mm-mark";
import { customClass } from "mm-mark";

const converter = mmmark.Converter({
  noHeaderId: true, // recommended to set `true` for option `noHeaderId` when using customClass extension
  extensions: [customClass],
});
const md = `#[.header]Header`;
const html = converter.makeHtml(md);
console.log(html); // <h1 class="header">Header</h1>
```

You can use any `showdown` extensions.
