const merge = require('webpack-merge');
const shared = require('./webpack.shared');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
]

const prod = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // fallback to style-loader in development
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "sass-loader", // compiles Sass to CSS
          options: {
            implementation: require('sass')
          }
        }
      ]
    }]
  },
  plugins
};
module.exports = merge(shared, prod);
