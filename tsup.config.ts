import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["a.ts"],
  outDir: "./asan",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: ["esm"],
  bundle: true,
  treeshake: true,
  clean: true
});
