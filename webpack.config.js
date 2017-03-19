const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');

const BUILD_DIR = path.join(__dirname, '/build');
const APP_DIR = path.join(__dirname, '/src');

process.env.NODE_ENV = 'production';

const fs = require('fs');
let nodeModules = {};
fs.readdirSync(path.resolve(__dirname,'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

const vendorPackages = [
    'react',
    'react-dom',
    'react-router',
    'react-redux',
    'redux',
    'redux-promise-middleware',
    'redux-thunk',
    'socket.io-client',
    'redux-socket.io'
];

const server = {
    name: 'server',
    bail: true,
    target: 'node',
    devtool: false,
    node: {
        __dirname: false
    },
    entry: path.join(__dirname,'server','index.js'),
    output: {
        path: BUILD_DIR,
        filename: 'server.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: ['es2015'],
                }
            }
        ]
    },
    plugins: [
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin(),
    ]
};
const client = {
    name: 'client',
    bail: true,
    target: 'web',
    devtool: false,
    entry: {
        bundle: path.join(APP_DIR,'index.js'),
        vendor: vendorPackages
    },
    output: {
        path: path.join(BUILD_DIR,'public'),
        publicPath: '/',
        filename: 'static/js/[name].[chunkhash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: ['es2015','react','stage-0'],
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new InterpolateHtmlPlugin({
            'PUBLIC_URL' : ''
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname + '/public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }

        }),
        new ExtractTextPlugin({
            filename: "static/css/styles.[chunkhash:8].css",
            allChunks: true
        }),
        // Minify the code.
        new OptimizeCssAssetsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new CompressionPlugin({
            test: /.\.css$|\.html$|\.jsx?$/,
            minRatio: 0.8
        }),
    ]
};

module.exports = [
    client,
    server
];