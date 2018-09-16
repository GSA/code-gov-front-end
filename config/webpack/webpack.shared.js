const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['docs']),
    new CopyWebpackPlugin([
      {
        from: './assets/img',
        to: 'img'
      },
      {
        from: './404.html',
        to: '404.html'
      }
    ]),
    new FaviconsWebpackPlugin('./assets/img/favicon.png'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'caribou',
    }),
    new DefinePlugin({
      CODE_GOV_API_KEY: process.env.CODE_GOV_API_KEY || null
    })    
  ],
}