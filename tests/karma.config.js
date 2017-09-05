const argv = require('yargs').argv
const webpack = require('webpack')

const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
  basePath: '../',
  browsers: ['PhantomJS'],
  singleRun: !argv.watch,
  coverageReporter: {
    reporters: [
      { type: 'text-summary' }
    ]
  },
  files: [{
    pattern: TEST_BUNDLER,
    watched: false,
    served: true,
    included: true
  }],
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    [TEST_BUNDLER]: ['webpack']
  },
  logLevel: 'WARN',
  browserConsoleLogOptions: {
    terminal: true,
    format: '%b %T: %m',
    level: ''
  },
  webpack: {
    entry: TEST_BUNDLER,
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            plugins: [
              'babel-plugin-transform-class-properties',
              'babel-plugin-syntax-dynamic-import',
              [
                'babel-plugin-transform-runtime',
                {
                  helpers: true,
                  polyfill: false, // we polyfill needed features in src/normalize.js
                  regenerator: true
                }
              ],
              [
                'babel-plugin-transform-object-rest-spread',
                {
                  useBuiltIns: true // we polyfill Object.assign in src/normalize.js
                }
              ]
            ],
            presets: [
              'babel-preset-latest',
              ['babel-preset-react', { development: true }]
              // ['babel-preset-env', {
              //   modules: false,
              //   targets: {
              //     ie9: true
              //   },
              //   uglify: true
              // }]
            ]
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'test'
      })
    ],
    resolve: {
      modules: ['.', 'node_modules'],
      extensions: ['.css', '.js', '.json', '.jsx']
    },
    externals: {
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react'
    }
  },
  webpackMiddleware: {
    stats: 'errors-only',
    noInfo: true
  }
}

module.exports = (cfg) => cfg.set(karmaConfig)
