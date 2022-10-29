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
};
