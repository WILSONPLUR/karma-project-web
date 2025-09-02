const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,
    watchFiles: [
      "site/layouts/**/*",
      "site/content/**/*",
      "site/data/**/*",
      "site/static/**/*",
    ],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  cache: {
    type: "filesystem",
  },
});
