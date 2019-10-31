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

console.log('process.env.CODE_GOV_API_BASE:', process.env.CODE_GOV_API_BASE)
console.log('process.env.CODE_GOV_API_KEY:', process.env.CODE_GOV_API_KEY)
console.log('process.env.CODE_GOV_BRANCH:', process.env.CODE_GOV_BRANCH)
console.log('process.env.CODE_GOV_RELATIVE_DIR:', process.env.CODE_GOV_RELATIVE_DIR)

// https://webpack.js.org/guides/public-path/
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/'
console.log('process.env.PUBLIC_PATH:', process.env.PUBLIC_PATH)

let OUTPUT_PATH
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
console.log('process.env.CODE_GOV_CONFIG_JSON:', process.env.CODE_GOV_CONFIG_JSON)

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
    from: './styles/uswds/fonts',
    to: join(OUTPUT_PATH, '/uswds/fonts')
  },
  {
    from: './src/components/about-page/html',
    to: join(OUTPUT_PATH, '/src/components/about-page/html')
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
    from: 'node_modules/@code.gov/json-schema-web-component/dist/json-schema.js',
    to: 'webcomponents/json-schema.js'
  },
  {
    from:
      'node_modules/@code.gov/compliance-dashboard-web-component/dist/compliance-dashboard.min.js',
    to: 'webcomponents/compliance-dashboard.js'
  },
  {
    from:
      'node_modules/@code.gov/json-schema-validator-web-component/dist/json-schema-validator.js',
    to: 'webcomponents/json-schema-validator.js'
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

if (
  process.env.OUTPUT_RELATIVE_PATH &&
  process.env.OUTPUT_RELATIVE_PATH.includes('federalist-prod')
) {
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
            loader: 'css-loader',  // translates CSS into CommonJS
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
      ENABLE_GOOGLE_ANALYTICS: process.env.CODE_GOV_BRANCH === 'federalist-prod',
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
      SITE_CONFIG: JSON.stringify(SITE_CONFIG)
    }),
    new EnvironmentPlugin(['CODE_GOV_API_BASE', 'CODE_GOV_API_KEY', 'CODE_GOV_TASKS_URL']),
    new CleanWebpackPlugin([OUTPUT_PATH], { root: rootDir }),
    new CopyWebpackPlugin(patterns),
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
      prefix: '/assets/img/favicons',
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
