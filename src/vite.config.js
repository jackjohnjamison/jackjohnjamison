import topLevelAwait from "vite-plugin-top-level-await";

export default {
  base: "/tiles/",
  build: {
    outDir: "../",
    emptyOutDir: false,
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  plugins: [
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
};
