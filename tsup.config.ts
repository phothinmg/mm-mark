import { defineConfig } from "tsup";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./dist",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: "esm",
  bundle: true,
  treeshake: true,
  minify: true,
  keepNames: true,
});
