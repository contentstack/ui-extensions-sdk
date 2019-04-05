const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

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
        new WebpackShellPlugin({onBuildEnd: ['npm run generate:docs'], dev: false})
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                fix: true
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
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
    performance: {
        hints: 'warning'
    },
    stats: 'normal'
};