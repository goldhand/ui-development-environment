/* eslint-env node */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

const OUT_DIR = "dist";

module.exports = {
  entry: {
    polyfills: "@babel/polyfill",
    main: "./src/render.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, OUT_DIR)
  },
  plugins: [new CleanWebpackPlugin([OUT_DIR]), new HtmlWebpackPlugin()]
};
