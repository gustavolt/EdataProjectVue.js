'use strict'

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

/**
 * @desc Configura o webpack para exportação do bundle. Seções utilizadas:
 * @about optimization: https://webpack.js.org/configuration/optimization/
 * @about splitChunks: https://webpack.js.org/plugins/split-chunks-plugin/
 * @about output: https://webpack.js.org/configuration/output/
 * @about resolve: https://webpack.js.org/configuration/resolve/
 */
module.exports = {
    entry: {
        app: './src/main.js'
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === config.build.env.NODE_ENV
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformToRequire: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, "not_exist_path")
                ],
                use: [MiniCssExtractPlugin.loader, "style!css"]
            },
            {
                test: /\.scss$/i,
                include: [
                    path.resolve(__dirname, "not_exist_path")
                ],
                use: [MiniCssExtractPlugin.loader, "style!scss"]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        esModule: false,
                    },
                }],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        esModule: false,
                    },
                }],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        esModule: false,
                    },
                }],
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ]
}
