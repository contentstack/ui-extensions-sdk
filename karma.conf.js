const path = require('path');
module.exports = function (config) {
  config.set({
    files: [
      {
        pattern: 'lib/*.js', watched: true, served: false, included: false, nocache: false
      },
      {
        pattern: 'test/*Spec.js', watched: true, served: true, included: true
      }
    ],
    autoWatch: true,
    singleRun: false,
    failOnEmptyTestSuite: false,
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-applescript-launcher'),
      require('karma-summary-reporter')
    ],
    logLevel: config.LOG_WARN, // config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
    frameworks: ['jasmine'],
    browsers: ['Chrome', 'Firefox', 'Safari'],
    reporters: ['kjhtml', 'summary'],
    retryLimit: 0,
    client: {
      captureConsole: false,
      clearContext: false,
      runInParent: false,
      useIframe: true,
      jasmine: {
        random: false
      }
    },
    preprocessors: {
      'test/*Spec.js': ['webpack', 'sourcemap'],
      'lib/*.js': ['webpack', 'sourcemap']
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
      logLevel: 'error'
    },
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [{ type: 'html', subdir: 'html' }, { type: 'text-summary' }],
      check: { global: { statements: 90, branches: 90, functions: 90, lines: 90 } }
    },
    summaryReporter: {
      show: 'failed',
      specLength: 50,
      overviewColumn: true
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // instruments lib/ for the coverage reporter (npm run test:coverage)
              plugins: [['istanbul', { include: ['lib/**'] }]]
            }
          },
          {
            test: /\.css$/,
            use: {
              loader: 'css-loader'
            },
            include: path.resolve('lib/')
          }
        ]
      }
    }
  });
};
