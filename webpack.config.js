const webpack = require("webpack");

module.exports = {
  entry: "./src/renderer/index.tsx",
  output: {
    filename: "renderer.js",
    path: __dirname + "/build"
  },

  "target": "electron-renderer",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },

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
    // new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ])
  ]
};
