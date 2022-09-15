module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@pages": "./src/pages",
            "@theme": "./src/theme",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
