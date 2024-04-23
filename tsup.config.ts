/* cspell:disable */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./dist",
  splitting: true,
  sourcemap: true,
  // dts: true,
  format: "cjs",
  bundle: true,
  treeshake: true,
  minify: true,
  external: ['fs','showdown-mathjax','showdown-prism'],
});
