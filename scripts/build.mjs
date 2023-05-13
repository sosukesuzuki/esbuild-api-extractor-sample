import url from "node:url";
import child_process from "node:child_process";
import { build } from "esbuild";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";

function runTsc() {
  child_process.execFileSync(`./node_modules/.bin/tsc`);
}

function runApiExtractor() {
  const apiExtractorJsonPath = url.fileURLToPath(
    new URL("../api-extractor.json", import.meta.url)
  );

  const extractorConfig =
    ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  return Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });
}

function runEsbuild() {
  /** @type {import('esbuild').BuildOptions} */
  const options = {
    entryPoints: ["./src/index.ts"],
    minify: true,
    bundle: true,
    outfile: "./dist/index.js",
    target: "node14.11",
    platform: "node",
    format: "cjs",
  };
  return build(options);
}

function main() {
  runTsc();
  runApiExtractor();
  runEsbuild();
}

main();
