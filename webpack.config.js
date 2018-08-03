const path = require('path');

module.exports = {
  entry: {
    "ui-extension-sdk" : path.resolve(__dirname, 'webpack-entry.js')
  },
  mode: "production",
  output: {
    library: "ContentstackUIExtension",
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: false,
    port: 9000,
    watchOptions: {
      poll: true
    },
    watchContentBase: true,
    stats: 'errors-only',
  }

};