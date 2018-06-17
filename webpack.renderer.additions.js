const {
  TsConfigPathsPlugin
} = require('awesome-typescript-loader');
const webpack = require('webpack');

module.exports = {
  resolve: {
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true
        }
      }],
      enforce: 'pre',
      exclude: /node_modules/
    }]
  }
  // devServer: {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // }
}
