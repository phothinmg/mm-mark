## Markdown <===> HTML Converter

**_ESM Only_**

![md-html](https://miro.medium.com/v2/resize:fit:1400/1*eZ7YPTqzcyFVoQxIOIQ9kQ.png)

---

### About

Markdown to HTML converter using [Showdown](https://github.com/showdownjs/showdown).

---

### Install

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

### USAGE

```javascript
import { mmMark } from "mm-mark";
```

**_APIs_**

1. **Frontmatter**

   - frontmatter.data ----> metadata from markdown document.

   - frontmatter.content ----> content from markdown document.

     ```markdown
     ---
     title: Your post title
     date: 2020-07-22
     ---

     # Hello

     Hello World.
     ```

     ```javascript
     const mark = mmMark.frontmatter(/*Markdown Content*/);
     console.log(mark.data);
     console.log(mark.content);
     ```

2. **Converter**

   - Showdown converter

     ```javascript
     const converter = mmMark.converter({
       /*Showdown Options*/
     });
     ```

   - Options and outputs can see in [Showdown Documentation](https://showdownjs.com/docs/)

3. **markToHtml**

   - Converted HTML

   ```javascript
   const HTML = mmMark.markToHtml(/*Markdown Content*/);
   ```

| Outputs       | Description                                           |
| ------------- | ----------------------------------------------------- |
| data          | frontmatter                                           |
| json          | {data: , content: }                                   |
| convertedHtml | converted whole document                              |
| postHtml      | Formated HTML , post title , post date , reading time |
| pageHtml      | Only formated contents.                               |


---
