const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '../src');

const vendorPackages = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'react-redux',
    'redux',
    'redux-promise-middleware',
    'redux-thunk',
    'socket.io-client',
    'redux-socket.io'
];

const config = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    context: __dirname,
    entry: {
        bundle: path.join(APP_DIR,'index.js'),
        vendor: vendorPackages
    },
    stats: {
        colors: true
    },
    output: {
        path: path.join(__dirname,'js'),
        publicPath: '/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: ['react','stage-0'],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),

    ]
};

module.exports = config;