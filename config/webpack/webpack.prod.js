const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const shared = require('./webpack.shared')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const sass = require('sass')
const autoprefixer = require('autoprefixer')
const postSortMediaQueries = require('postcss-sort-media-queries')

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }]
    },
    canPrint: true
  }),
]

const prod = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
            options: {
              sourceMap: true
            }
          },
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'postcss-loader', // adds vendor prefixing
            options: {
              indent: 'postcss',
              parser: 'postcss-scss',
              sourceMap: true,
              plugins: [
                autoprefixer({ grid: true }),
                postSortMediaQueries({ sort: 'mobile-first' }),
              ]
            }
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              implementation: sass,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins
}
module.exports = merge(shared, prod)
