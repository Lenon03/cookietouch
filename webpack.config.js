const webpack = require("webpack");
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: "./src/renderer/index.tsx",
  output: {
    filename: "renderer.js",
    path: __dirname + "/build"
  },

  "target": "electron-renderer",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      new TsConfigPathsPlugin(),
    ]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
              failOnHint: true
            }
          }
        ],
        enforce: 'pre',
        exclude: /node_modules/
      },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    // new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ]),
  ]
};
