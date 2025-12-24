const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    'ui-extension-sdk': path.resolve(__dirname, 'webpack-entry.js')
  },
  mode: 'production',
  output: {
    library: 'ContentstackUIExtension',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  plugins: [
    new WebpackShellPlugin({ onBuildEnd: ['npm run generate:docs'], dev: false }),
    new MiniCssExtractPlugin(),
    new ESLintWebpackPlugin({
      extensions: ['js'],
      fix: true
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
      include: [path.resolve(__dirname, 'lib')]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: false,
    port: 9000,
    watchOptions: {
      poll: true
    },
    watchContentBase: true,
    stats: 'normal'
  },
  resolve: {
    extensions: ['.json', '.js', '.ts', '.css']
  },
  performance: {
    hints: 'warning'
  },
  stats: 'normal'
};
