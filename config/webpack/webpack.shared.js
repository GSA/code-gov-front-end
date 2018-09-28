const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.dirname(path.dirname(__dirname))
console.log("process.env.CODE_GOV_API_KEY:", process.env.CODE_GOV_API_KEY)
const docsDir = path.join(rootDir, 'docs')

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: docsDir,
    publicPath: '/'
  },
  entry: {
    index: ['@babel/polyfill', './src/index.js']
  },
  resolve: {
    modules: ['node_modules', 'src', 'config'],
    extensions: ['.js', '.json', '.md']
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
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-arrow-functions',
              '@babel/plugin-transform-classes',
              '@babel/plugin-syntax-dynamic-import',
              'babel-plugin-dynamic-import-node',
              'babel-plugin-transform-function-bind',
              '@babel/plugin-transform-regenerator'
            ],
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.md$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: "markdown-loader",
                options: {
                    /* your options here */
                }
            }
        ]
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin(["CODE_GOV_API_KEY"]),
    new CleanWebpackPlugin(['docs'], { root: rootDir }),
    new CopyWebpackPlugin([
      {
        from: './assets/img',
        to: path.join(docsDir, '/assets/img')
      },
      {
        from: './404.html',
        to: path.join(docsDir, '404.html')
      },
      {
        from: 'node_modules/@code.gov/code-gov-style/dist/js/code-gov-web-components.js',
        to: 'code-gov-web-components.js'
      },
      {
        from: 'node_modules/@webcomponents/custom-elements/custom-elements.min.js',
        to: 'polyfills/custom-elements.js'
      },
      {
        from: 'node_modules/custom-event-polyfill/polyfill.js',
        to: 'polyfills/custom-event.js'
      },
      {
        from: 'node_modules/whatwg-fetch/dist/fetch.umd.js',
        to: 'polyfills/fetch.js'
      }
    ]),
    new FaviconsWebpackPlugin('./assets/img/favicon.png'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'caribou',
    })
  ],
}
