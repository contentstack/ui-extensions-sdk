const path = require('path')
module.exports = function (config) {
  config.set({
    basePath: '',
    exclude: [],
    files: [
      { pattern: 'lib/*.js', watched: true, served: false, included: false, nocache: false },
      { pattern: 'test/*Spec.js', watched: true, served: true, included: true }
    ],
    autoWatch: true,
    singleRun: false,
    failOnEmptyTestSuite: false,
    logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
    frameworks: ['jasmine'],
    browsers: ['Chrome','Firefox' /*,'PhantomJS','Edge','ChromeCanary','Opera','IE','Safari'*/ ],
    reporters: ['kjhtml','coverage-istanbul','mocha'],
    listenAddress: '0.0.0.0',
    hostname: 'localhost',
    port: 9876,
    retryLimit: 0,
    browserDisconnectTimeout: 5000,
    browserNoActivityTimeout: 10000,
    captureTimeout: 60000,
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
      'test/*Spec.js': ['webpack', "sourcemap"],
      'lib/*.js': ['webpack', "sourcemap"]
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
      logLevel : 'error'
    },
    coverageIstanbulReporter: {
      combineBrowserReports: false,
      reports: ['html'],
      dir: path.join(__dirname, 'coverage'),
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },
    mochaReporter: {
      output: 'full' //full, autowatch, minimal
    },
    webpack: {
      mode: "development",
      stats: {
        modules: false,
      },
      module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
            },{
          test: /\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            query: {
              esModules: true
            }
          },
          include: path.resolve('lib/')
        }]
      }
    }
  });
};