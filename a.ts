import Mmmark from "./src/index.js";
import fs from "node:fs";
const markdown = `
---
title: hello world
date: 2024-07-07
tags:
    - foo
    - bar
---


## Hello

`
const html = Mmmark.converter(markdown).html;
const metadata = Mmmark.converter(markdown).metadata;


console.log(html) // <h2>Hello</h2>
console.log(metadata) 
/*
{
    title: 'hello world',
    date: 2024-07-07T00:00:00.000Z,
    tags: [ 'foo', 'bar' ]
  }
    
  */
