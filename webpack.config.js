const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, { mode = "development" }) => {
  const isProduction = mode === "production";
  process.env.NODE_ENV = mode;

  const externals =
    isProduction || devBundle
      ? {
          react: {
            commonjs2: "react"
          },
          "react-dom": {
            commonjs2: "react-dom"
          }
        }
      : {};

  return {
    entry: "./src/app.js",

    mode,

    output: {
      path: path.resolve(__dirname, "build"),
      filename: "app.js",
      libraryTarget: "commonjs2"
    },

    resolve: {
      extensions: [".js"]
    },

    externals: {
      react: {
        commonjs2: "react"
      },
      "react-dom": {
        commonjs2: "react-dom"
      }
    },

    plugins: [
      new CopyPlugin([
        { from: 'src/index.html', to: 'index.html' },
      ]),
    ]
  };
};
