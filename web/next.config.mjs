export default (phase, { defaultConfig }) => {
  const env = process.env.NODE_ENV;
  /**
   * @type {import("next").NextConfig}
   */
  if (env === "production") {
    return {
      output: "export",
      assetPrefix: "/ui/",
      basePath: "/ui",
      distDir: "../ui"
    };
  } else {
    return {
      async rewrites() {
        return [
          {
            source: "/query",
            destination: "https://ai.api.laiwen.cn/api/chat/Aiwen/Query" // Proxy to Backend
          },
          {
            source: "/history",
            destination: "https://ai.api.laiwen.cn/api/chat/Aiwen/QueryHistory" // Proxy to Backend
          }
        ];
      }
    };
  }
}
