const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'eval-cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch'
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
});