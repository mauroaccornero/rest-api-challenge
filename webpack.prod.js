'use strict';

const { merge } = require('webpack-merge');
const TerserPlugin  = require('terser-webpack-plugin');
const { DefinePlugin }  = require('webpack');
const common  = require('./webpack.common.js');

module.exports = (env) => {
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    // use this to check env vars (ex. npm run build -- --env API_URL=http://localhost:9090)
    //console.log(envKeys)

    return merge(common, {
        mode: 'production',
        plugins: [
            new DefinePlugin(envKeys)
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
                minSize: 0,
                maxInitialRequests: 20,
                maxAsyncRequests: 20,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunks, cacheGroupKey) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                        }
                    },
                    common: {
                        minChunks: 2,
                        priority: -10
                    }
                }
            },
            runtimeChunk: "single",
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
        },
    });
}
