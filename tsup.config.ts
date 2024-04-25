import { defineConfig } from "tsup";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

export default defineConfig({
  entry: ["./opt/index.ts"],
  outDir: "./dist",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: ["cjs", "esm", "iife"],
  legacyOutput: true,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  bundle: true,
  treeshake: true,
  minify: true,
  keepNames: true,
  esbuildPlugins: [
    polyfillNode({
      polyfills: {
        fs: true,
        "fs/promises": true,
        process: true,
      },
    }),
  ],
  esbuildOptions(options, context) {
    options.globalName= "mm_mark";
    options.external = ["node:fs"];
    options.legalComments = "external";
  },
});
