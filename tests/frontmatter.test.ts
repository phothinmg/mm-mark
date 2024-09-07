import mmmark from "../src/index.js";
import assert from "node:assert";
import test from "node:test";

test("Front matter", async (t) => {
  const mdcontent = `
---
title: 'value'
---
This is the content`;
  const result = mmmark.frontmatter(mdcontent);
  const data = result.data;
  const content = result.content;
  await t.test("data", () => {
    assert.deepEqual(data, { title: "value" });
  });
  await t.test("content", () => {
    assert.deepEqual(content, "This is the content");
  });
});
