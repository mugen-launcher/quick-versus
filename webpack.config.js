const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, { mode = "development" }) => {
  process.env.NODE_ENV = mode;

  return {
    target: "electron-renderer",
    entry: "./src/index.jsx",
    devtool: "source-map",
    mode,
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "app.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      new CopyPlugin({
        patterns:
          [
            { from: "src/index.html", to: "index.html" },
            { from: "src/style.css", to: "style.css" },
            { from: "src/assets/icon.png", to: "icon.png" },
            { from: "src/assets/background.jpg", to: "assets/background.jpg" }
          ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["css-loader"]
        },
        {
          test: /\.(jpg|png|wav)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                esModule: true
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack"
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.jsx?$/,
          loader: require.resolve("babel-loader"),
          exclude: /node_modules/
        }
      ]
    }
  };
};
