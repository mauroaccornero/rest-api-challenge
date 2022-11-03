'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = ({
    entry: { 'rac.app': path.resolve(__dirname, 'src/index.tsx') },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
        }),
        new MiniCssExtractPlugin(),
    ],
});

