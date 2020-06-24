const { dirname, join } = require('path')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const sass = require('sass')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const rootDir = dirname(dirname(__dirname))
const nodeModulesDir = join(rootDir, 'node_modules')

require('dotenv-flow').config()

// https://webpack.js.org/guides/public-path/
let PUBLIC_PATH = process.env.BASEURL || process.env.PUBLIC_PATH || '/'
let OUTPUT_PATH

// add slash to end of path for federalist branch builds
if (PUBLIC_PATH.slice(-1) !== '/') PUBLIC_PATH = `${PUBLIC_PATH}/`

console.log('process.env.CODE_GOV_API_BASE:', process.env.CODE_GOV_API_BASE)
console.log('process.env.CODE_GOV_API_KEY:', process.env.CODE_GOV_API_KEY)
console.log('process.env.CODE_GOV_BRANCH:', process.env.CODE_GOV_BRANCH)
console.log('process.env.CODE_GOV_RELATIVE_DIR:', process.env.CODE_GOV_RELATIVE_DIR)
console.log('process.env.PUBLIC_PATH', process.env.PUBLIC_PATH)
console.log('PUBLIC_PATH', PUBLIC_PATH)
console.log('process.env.BASEURL:', process.env.BASEURL)

if (process.env.OUTPUT_PATH) {
  OUTPUT_PATH = process.env.OUTPUT_PATH
} else if (process.env.OUTPUT_RELATIVE_PATH) {
  OUTPUT_PATH = join(rootDir, process.env.OUTPUT_RELATIVE_PATH)
} else {
  OUTPUT_PATH = join(rootDir, '/dist')
}

console.log('OUTPUT_PATH:', OUTPUT_PATH)

if (!OUTPUT_PATH) {
  throw new Error('Please define an output path')
}

const entry = {
  index: ['@babel/polyfill', './src/index.js']
}

const siteConfigPath = process.env.CODE_GOV_CONFIG_JSON || join(rootDir, '/config/site/site.json')

/* eslint-disable import/no-dynamic-require */
const SITE_CONFIG = require(siteConfigPath)

const patterns = [
  {
    from: './assets/data',
    to: join(OUTPUT_PATH, '/assets/data')
  },
  {
    from: './assets/img',
    to: join(OUTPUT_PATH, '/assets/img')
  },
  {
    from: './styles/uswds/img',
    to: join(OUTPUT_PATH, '/uswds/img')
  },
  {
    from: './styles/uswds/js',
    to: join(OUTPUT_PATH, '/uswds/js')
  },
  {
    from: './assets/fonts/*',
    to: join(OUTPUT_PATH, '/uswds/fonts/'),
    flatten: true
  },
  {
    from: './styles/uswds/fonts',
    to: join(OUTPUT_PATH, '/uswds/fonts')
  },
  {
    from: './src/components/federal-agencies/html',
    to: join(OUTPUT_PATH, '/src/components/federal-agencies/html')
  },
  {
    from: './404.html',
    to: join(OUTPUT_PATH, '404.html')
  },
  {
    from: join(nodeModulesDir, '@code.gov/code-gov-style/dist/js/code-gov-web-components.js'),
    to: 'webcomponents/code-gov-web-components.js'
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
  },
  {
    from: 'node_modules/ajv/dist/ajv.min.js',
    to: 'external/ajv.min.js'
  },
  {
    from: 'node_modules/jsoneditor/dist',
    to: 'external/jsoneditor/dist'
  }
]

if (process.env.BRANCH && process.env.BRANCH.includes('production')) {
  // only include sitemap if building for production on code.gov
  patterns.push({
    from: 'node_modules/@code.gov/site-map-generator/sitemap.xml',
    to: join(OUTPUT_PATH, 'sitemap.xml')
  })
}

module.exports = {
  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH
  },
  entry,
  resolve: {
    modules: ['node_modules', 'src', 'config'],
    extensions: ['.js', '.json', '.md']
  },
  module: {
    rules: [
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
      },
      {
        test: /\.(png)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images'
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
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
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
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      ENABLE_GOOGLE_ANALYTICS: process.env.CODE_GOV_BRANCH === 'production',
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
      SITE_CONFIG: JSON.stringify(SITE_CONFIG)
    }),
    new EnvironmentPlugin(['CODE_GOV_API_BASE', 'CODE_GOV_API_KEY', 'CODE_GOV_TASKS_URL']),
    // new CleanWebpackPlugin([OUTPUT_PATH], { root: rootDir }),
    new CopyWebpackPlugin({ patterns }),
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
  ],
  watchOptions: {
    ignored: ['plugins']
  }
}
