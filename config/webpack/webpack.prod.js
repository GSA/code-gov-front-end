const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const shared = require('./webpack.shared');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/* to do, fix bugs with using MiniCssExtractPlugin
 */

const prod = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // fallback to style-loader in development
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    /*
    new CnameWebpackPlugin({
      domain: 'code.gov',
    })
    */
  ]
};
module.exports = merge(shared, prod);
