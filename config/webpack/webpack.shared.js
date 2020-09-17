const path = require('path')
const { dirname, join, resolve } = require('path')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const DefinePlugin = require('webpack/lib/DefinePlugin')
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin')

const rootDir = dirname(dirname(__dirname))
const sass = require('sass')

const nodeModulesDir = join(rootDir, 'node_modules')
const siteConfigPath = process.env.CODE_GOV_CONFIG_JSON || join(rootDir, '/config/site/site.json')
const SITE_CONFIG = require(siteConfigPath)

require('dotenv-flow').config()

let PUBLIC_PATH = process.env.BASEURL || process.env.PUBLIC_PATH || '/'
let OUTPUT_PATH
const BRANCH = process.env.BRANCH || 'development'

// add slash to end of path for federalist branch builds
if (PUBLIC_PATH.slice(-1) !== '/') PUBLIC_PATH = `${PUBLIC_PATH}/`

if (process.env.OUTPUT_PATH) {
  OUTPUT_PATH = process.env.OUTPUT_PATH
} else if (process.env.OUTPUT_RELATIVE_PATH) {
  OUTPUT_PATH = join(rootDir, process.env.OUTPUT_RELATIVE_PATH)
} else {
  OUTPUT_PATH = join(rootDir, '/dist')
}

if (BRANCH.includes('production')) {
  // only include sitemap if building for production on code.gov
  patterns.push({
    from: 'node_modules/@code.gov/site-map-generator/sitemap.xml',
    to: join(OUTPUT_PATH, 'sitemap.xml')
  })
}

module.exports = {
  entry: {
    index: ['@babel/polyfill', './src/index.js']
  },
  resolve: {
    modules: ['node_modules', 'src', 'config'],
    extensions: ['.js', '.json', '.md']
  },
  plugins: [
    new DefinePlugin({
      ENABLE_GOOGLE_ANALYTICS: BRANCH === 'production',
      ENABLE_FED_ANALYTICS: BRANCH === 'production',
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
      SITE_CONFIG: JSON.stringify(SITE_CONFIG)
    }),
    new EnvironmentPlugin(['CODE_GOV_API_BASE', 'CODE_GOV_API_KEY', 'CODE_GOV_TASKS_URL']),
    // new MiniCssExtractPlugin({
    //  filename: "styles/[name].css"
    // }),
    new CopyPlugin({
      patterns: [
        { from: 'styles', to: 'css' },
        { from: 'assets/data', to: 'assets/data' },
        { from: 'assets/img', to: 'assets/img' },
        {
          from: './src/components/federal-agencies/html',
          to: 'src/components/federal-agencies/html'
        },
        {
          from: 'img/**/*',
          to: 'styles/uswds/',
          context: path.resolve(rootDir, 'node_modules', 'uswds', 'dist')
        },
        {
          from: 'fonts/**/*',
          to: 'uswds/',
          context: path.resolve(rootDir, 'node_modules', 'uswds', 'dist')
        },
        {
          from: 'fonts/*',
          to: 'uswds/',
          context: path.resolve(rootDir, 'assets')
        },
        {
          from: 'fonts/*',
          to: 'assets/',
          context: path.resolve(rootDir, 'assets')
        }
      ]
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'index.html',
      templateParameters: {
        PUBLIC_PATH
      },
      title: 'code.gov',
      minify: {
        removeScriptTypeAttributes: true
      }
    }),
    new AppManifestWebpackPlugin({
      emitStats: true,
      logo: './assets/img/favicon.png',
      icons: {
        appleStartup: false
      },
      inject: true,
      prefix: join(PUBLIC_PATH, '/assets/img/favicons'),
      output: './assets/img/favicons/',
      config: {
        favicons: true,
        firefox: true,
        windows: true,
        yandex: false
      }
    })
    // new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(rootDir, 'dist'),
    compress: true,
    writeToDisk: true,
    historyApiFallback: {
      index: 'index.html'
    },
    port: 8080
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // {
      //    // Apply rule for .sass, .scss or .css files
      //  test: /\.css$/,

      //  // Set loaders to transform files.
      //  // Loaders are applying from right to left(!)
      //  // The first loader will be applied after others
      //  use: [
      //    {
      //      // After all CSS loaders we use plugin to do his work.
      //      // It gets all transformed CSS and extracts it into separate
      //      // single bundled file
      //      loader: MiniCssExtractPlugin.loader
      //    },
      //    'css-loader'
      //  ]
      // },
      // {
      //    // Apply rule for .sass, .scss or .css files
      //  test: /\.(sa|sc|c)ss$/,

      //  // Set loaders to transform files.
      //  // Loaders are applying from right to left(!)
      //  // The first loader will be applied after others
      //  use: [
      //    //{
      //    //  loader: 'style-loader', // creates style nodes from JS strings
      //    //  options: {
      //    //    sourceMap: true
      //    //  }
      //    //},
      //    {
      //      loader: MiniCssExtractPlugin.loader
      //    },
      //    {
      //      // This loader resolves url() and @imports inside CSS
      //      loader: "css-loader", options: { url: false, sourceMap: true }
      //    },
      //    {
      //      // Then we apply postCSS fixes like autoprefixer and minifying
      //      loader: "postcss-loader",
      //      options: {
      //        sourceMap: true
      //      }
      //    },
      //    {
      //      // First we transform SASS to standard CSS
      //      loader: "sass-loader",
      //      options: {
      //        implementation: require("node-sass"),
      //        sassOptions: {
      //          sourceMap: true,
      //          includePaths: [
      //            //join(dirname(module.filename), 'node_modules'),
      //            //join(dirname(module.filename), 'node_modules/uswds/dist/scss')
      //            path.resolve(__dirname, 'node_modules'),
      //            path.resolve(__dirname, 'node_modules/uswds/dist/scss'),
      //            path.resolve(__dirname, 'node_modules/uswds/dist/fonts')
      //          ]
      //        }
      //      }
      //    }
      //  ]
      // },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true
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
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              /* your options here */
            }
          }
        ]
      },
      {
        test: /\.(png)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images'
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
}
