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
const marked = require('marked')

const markdownRenderer = new marked.Renderer()

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

const patterns = [
  { from: 'styles', to: 'css' },
  { from: 'assets/data', to: 'assets/data' },
  { from: 'assets/img', to: 'assets/img' },
  {
    from: 'img/**/*',
    to: 'styles/uswds/',
    context: path.resolve(rootDir, 'node_modules', 'uswds', 'dist')
  },
  {
    from: './src/components/about/html',
    to: join(OUTPUT_PATH, '/src/components/about/html')
  },
  {
    from: './src/components/privacy-policy/html',
    to: join(OUTPUT_PATH, '/src/components/privacy-policy/html')
  },
  {
    from: './src/components/agency-compliance/html',
    to: join(OUTPUT_PATH, '/src/components/agency-compliance/html')
  },
  {
    from: './src/components/federal-agencies/html',
    to: join(OUTPUT_PATH, '/src/components/federal-agencies/html')
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
  },
  {
    from: './404.html',
    to: join(OUTPUT_PATH, '404.html')
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
  },
  {
    from: 'node_modules/url-search-params-polyfill/index.js',
    to: 'polyfills/url-search-params.js'
  }
]

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
    modules: ['node_modules', 'src', 'config', 'assets'],
    extensions: ['.js', '.json', '.md']
  },
  plugins: [
    new DefinePlugin({
      ENABLE_GOOGLE_ANALYTICS: BRANCH === 'production',
      ENABLE_FED_ANALYTICS: BRANCH === 'production' || BRANCH === 'staging',
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
      SITE_CONFIG: JSON.stringify(SITE_CONFIG)
    }),
    new EnvironmentPlugin(['CODE_GOV_API_BASE', 'CODE_GOV_API_KEY', 'CODE_GOV_TASKS_URL']),
    new CopyPlugin({ patterns }),
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
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH
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
              pedantic: true,
              renderer: markdownRenderer
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
