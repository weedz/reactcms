const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '/build');
const APP_DIR = path.join(__dirname, '/src');

process.env.NODE_ENV = 'production';

const fs = require('fs');
let nodeModules = {};
fs.readdirSync(path.resolve(__dirname,'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });
const server = {
    name: 'server',
    target: 'node',
    node: {
        __dirname: false
    },
    entry: path.join(__dirname,'server','index.js'),
    output: {
        path: path.join(__dirname,'build'),
        filename: 'server.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: ['es2016'],
                }
            }
        ]
    },
    plugins: [
        // Minify the code.
        //new webpack.optimize.UglifyJsPlugin(),
    ]
};
const client = {
    name: 'client',
    target: 'web',
    bail: true,
    devtool: 'source-map',
    entry: [
        APP_DIR + '/index.js'
    ],
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: 'static/js/bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: [
                    /node_modules/,
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/
                ],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?importLoaders=1"
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
        new ExtractTextPlugin("static/css/styles.css"),
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
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
    ]
};

module.exports = [
    client,
    server
];