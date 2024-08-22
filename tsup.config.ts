import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/extensions/index.ts"],
	outDir: "./dist/extensions",
	splitting: true,
	sourcemap: true,
	dts: true,
	format: ["esm"],
	bundle: true,
	treeshake: true,
	//clean: true,
});
