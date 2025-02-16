import { build } from "esbuild";

build({
  entryPoints: ["./src/server/**/*.ts"],
  outdir: "dist/server",
  target: "node20",
  platform: "node",
  bundle: false,
  minify: false,
  sourcemap: false,
  format: "esm",
  plugins: [
    {
      name: "log-files",
      setup(build) {
        // This onLoad hook will trigger for all files (because of the /.*/ filter)
        build.onLoad({ filter: /.*/ }, async (args) => {
          console.log("Loading file:", args.path);
          // Returning undefined allows the default loader to take over
          return;
        });
      },
    },
  ],
});
