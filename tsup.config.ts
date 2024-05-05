import { defineConfig } from "tsup";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./out",
  // splitting: true,
  // sourcemap: true,
  // dts: true,
  format: "iife",
  bundle: true,
  treeshake: true,
  globalName: "repackMd",
  // minify: true,
});
