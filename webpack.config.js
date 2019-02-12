/* eslint-env node */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const config = {
  entry: {
    polyfills: "@babel/polyfill",
    main: "./src/render.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({ favicon: "assets/favicon.ico" })
  ]
};

module.exports = (env = {}) => {
  if (env.development) {
    config.mode = "development";
    config.devtool = "inline-source-map";
    config.devServer = {
      contentBase: "./assets",
      hot: true
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  if (env.production) {
    config.mode = "production";
  }
  return config;
};
