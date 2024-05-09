# mm-mark

**_ESM Only_**

![md-html](https://miro.medium.com/v2/resize:fit:1400/1*eZ7YPTqzcyFVoQxIOIQ9kQ.png)

---

## Convert Markdown to HTML

Mmmark : Convert Md to Html with my own Prism.js code highlight and Mathjax extenstions of Showdown.Js.

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





## Documentations

### 1. Mmmark.renderHtml

#### 1.1 Descriptions

Renders the given text as HTML using the Showdown library.

#### 1.2 Options

##### 1.2.1 text: string | Markdown Contents.

##### 1.2.2 RenderOptions

###### 1.2.2.1 theme: string | oiptional | default - "vs"

Name of Prism.js themes for code block highlight.

| Available Themes      |
| --------------------- |
| `actom-dark`          |
| `cb`                  |
| `coldark-dark`        |
| `dark`                |
| `holi-theme`          |
| `duotone-earth`       |
| `duotone-forest`      |
| `duotone-light`       |
| `duotone-sea`         |
| `duotone-space`       |
| `funky`               |
| `ghcolors`            |
| `gruvbox-light`       |
| `laserwave`           |
| `lucario`             |
| `night-owl`           |
| `okaidia`             |
| `one-dark`            |
| `one-light`           |
| `solarized-dark-atom` |
| `synthwave84`         |
| `tomorrow`            |
| `twilight`            |
| `vs`                  |
| `vsc-dark-plus`       |
| `z-touch`             |

###### 1.2.2.2 languages?: string [ ] | optional | default - See below.

Prism Js supported languages , its perform prismjs `loadLanguages() ` ,prismjs will load the default languages: `markup`, `css`, `clike` and `javascript` and Mmmark will preload others additional languages are as follows. Do not use with Webpack or another bundler, as this will cause Webpack to include all languages and plugins.

| Preloaded Languages |
| ------------------- |
| `python`            |
| `py`                |
| `typescript`        |
| `ts`                |
| `yaml`              |
| `yml`               |
| `toml`              |
| `sass`              |
| `scss`              |
| `rust`              |
| `ruby`              |
| `rb`                |
| `jsx`               |
| `tsx`               |
| `php`               |
| `markdown`          |
| `md`                |
| `latex`             |
| `tex`               |
| `haskell`           |
| `hs`                |
| `json`              |
| `asciidoc`          |
| `adoc`              |
| `bash`              |
| `shell`             |
| `c`                 |
| `csharp`            |
| `cs`                |
| `dotnet`            |
| `cpp`               |
| `java`              |

##### 1.2.3 metadata: boolean | optional | fefault - false

If you used metadata (as follows) , set it `true`.

```yaml
---
title: Hello World
date: 2023-04-12
---
```

#### 1.3 Return 

##### 1.3.1 HTML: string | The rendered HTML string

#### 1.4 Example

```js
import Mmmark from "mm-mark";
const md = "# Hello World";
// convert to markdown to html
const converter = Mmmark.renderHtml(Options);

console.log(html);

/* 
-- others outputs that provided by Mmmark.

  <h1 id="hello-world">Hello World</h1>

-- others outputs that provided by Mmmark.
*/
```

### 2. Mmmark.getFrontmatter

#### 2.1 Descriptions

Generates data and content from the markdown file.

#### 2.2 Options 

##### 2.2.1  text: string | Markdown content

#### 2.3 Return 

##### 2.3.1 data: Record<string, unknown> | YAML front matter in Markdown files.

##### 2.3.2 content: string | Raw markdown content.

#### 2.4 Example

`example.md`

```md
---
title: Hello World
date: 2023-04-12
---

# Hello World!
```

```js
import Mmmark from "mm-mark";
import fs from "fs";

const md = fs.readFileSync("example.md", "utf-8");

const data = Mmmark.getFrontmatter(md).data
const content = Mmmark.getFrontmatter(md).content
```

---
