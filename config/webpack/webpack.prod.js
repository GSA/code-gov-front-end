const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const shared = require('./webpack.shared');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
]

if (process.env.CODE_GOV_BRANCH === 'federalist-prod') {
  plugins.push(new CnameWebpackPlugin({ domain: 'code.gov' }))
}

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
