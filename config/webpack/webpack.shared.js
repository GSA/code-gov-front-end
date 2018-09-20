const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.dirname(path.dirname(__dirname))
console.log("rootDir:", rootDir)
const docsDir = path.join(rootDir, 'docs')

module.exports = {
  output: {
    filename: 'bundle.js',
    path: docsDir,
    publicPath: '/'
  },
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json']
  },
  module: {
    rules: [{
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
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
    new CleanWebpackPlugin(['docs'], { root: rootDir }),
    new CopyWebpackPlugin([{
        from: './assets/img',
        to: path.join(docsDir, '/assets/img')
      },
      {
        from: './404.html',
        to: path.join(docsDir, '404.html')
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
