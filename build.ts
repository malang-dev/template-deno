import * as esbuild from "esbuild";
import copyPlugin from "esbuild/copy";
import { denoPlugins } from "esbuild/loader";
import { resolve } from "@std/path";

await esbuild.build({
  entryPoints: ["./src/main.ts"],
  plugins: [
    ...denoPlugins({
      configPath: resolve("./deno.jsonc"),
    }),
    copyPlugin({
      baseDir: "./",
      baseOutDir: "./dist",
      files: [
        { from: ".env.example", to: ".env.example" },
        { from: "static/*", to: "static/[name][ext]" },
      ],
    }),
  ],
  bundle: true,
  sourcemap: true,
  outfile: "./dist/main.esm.js",
  minify: true,
  format: "esm",
});
esbuild.stop();
