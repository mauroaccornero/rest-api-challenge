'use strict';

const { merge } = require('webpack-merge');
const common  = require('./webpack.common.js');
const path = require('path');
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
    mode: 'development',
    devtool: "cheap-module-source-map",
    devServer: {
        historyApiFallback: true,
        port: 3000
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, ".env.development")
        }),
    ]
});
