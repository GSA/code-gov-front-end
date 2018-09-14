const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const shared = require('./webpack.shared');
const OfflinePlugin = require('offline-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');

const prod = {
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'docs'),
    publicPath: '/'
  },
  plugins: [
    /*
    new OfflinePlugin({
      externals: [
      ]
    }),
    */
    new CnameWebpackPlugin({
      domain: 'app.geotiff.io',
    })
  ]
};
module.exports = merge(shared, prod);