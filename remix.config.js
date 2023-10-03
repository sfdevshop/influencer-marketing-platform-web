/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  publicPath: "/_static/build/",
  server: "server.ts",
  serverBuildPath: "server/index.mjs",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  serverModuleFormat: "esm",
  tailwind: true,
  browserNodeBuiltinsPolyfill: {
    modules: {
      buffer: true,
      stream: true,
      util: true,
      crypto: true,
    },
  },
};
