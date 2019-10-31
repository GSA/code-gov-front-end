const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const analyzeConfig = {
  plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'static' })]
}

const prodConfig = require('./webpack.prod.js')

module.exports = merge(prodConfig, analyzeConfig)
