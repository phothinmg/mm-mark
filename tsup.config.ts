import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["npm/index.ts"],
	outDir: "./dist",
	splitting: true,
	sourcemap: true,
	dts: true,
	format: ["esm"],
	bundle: true,
	treeshake: true,
	clean: true,
});
