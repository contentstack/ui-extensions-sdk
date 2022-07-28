const path = require('path')
module.exports = function (config) {
  config.set({
    files: [
      { pattern: 'lib/*.js', watched: true, served: false, included: false, nocache: false },
      { pattern: 'test/*Spec.js', watched: true, served: true, included: true }
    ],
    autoWatch: true,
    singleRun: false,  
    failOnEmptyTestSuite: false,
    plugins: [
      require("karma-webpack"), 
      require('karma-jasmine'), 
      require('karma-coverage-istanbul-reporter'), 
      require('karma-jasmine-html-reporter'), 
      require('karma-sourcemap-loader'), 
      require('karma-chrome-launcher'), 
      require('karma-firefox-launcher'),
      require('karma-safari-applescript-launcher'),
      require('karma-summary-reporter')
    ],
    logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
    frameworks: ['jasmine'],
    browsers: ['Chrome','Firefox','Safari' /*,'PhantomJS','Edge','ChromeCanary','Opera','IE'*/ ],
    reporters: ['kjhtml','coverage-istanbul', 'summary'],
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
      'test/*Spec.js': ['webpack', "sourcemap"],
      'lib/*.js': ['webpack', "sourcemap"]
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
      logLevel : 'error'
    },
    coverageIstanbulReporter: {
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      reports: ['html','text-summary'],
      dir: path.join(__dirname, 'coverage'),
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },
    summaryReporter: {
       show: 'failed',
       specLength: 50,
       overviewColumn: true
    },
    webpack: {
      mode: "development",
      module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
            },{
          test: /\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          },
          include: path.resolve('lib/')
        }]
      }
    }
  });
};