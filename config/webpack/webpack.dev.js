const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const shared = require('./webpack.shared')

const dev = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(shared, dev)
