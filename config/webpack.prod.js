const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const shared = require('./webpack.shared');
const OfflinePlugin = require('offline-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prod = {
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'docs'),
    publicPath: '/'
  },
  module: {
      rules: [{
          test: /\.scss$/,
          use: [
              // fallback to style-loader in development
              process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
          ]
      }]
  },  
  plugins: [
    /*
    new OfflinePlugin({
      externals: [
      ]
    }),
    */
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),    
    new CnameWebpackPlugin({
      domain: 'app.geotiff.io',
    })
  ]
};
module.exports = merge(shared, prod);