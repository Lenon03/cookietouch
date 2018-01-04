const {TsConfigPathsPlugin} = require('awesome-typescript-loader');
const webpack = require('webpack');

module.exports = {
  resolve: {
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
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
      }
    ]
  },
  // plugins: [new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //     'window.jQuery': 'jquery',
  //     Popper: [
  //       'popper.js', 'default'
  //     ]
  //     // In case you imported plugins individually, you must also require them here:
  //     // Util: "exports-loader?Util!bootstrap/js/dist/util",
  //     // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
  //   })]
}
