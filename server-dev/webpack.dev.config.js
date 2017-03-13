const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '../src');

const config = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    context: __dirname,
    entry: [
        //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.resolve(APP_DIR, './index.js')
    ],
    stats: {
        colors: true
    },
    output: {
        path: path.join(__dirname,'js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: ['es2015','react','stage-0'],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ]
};

module.exports = config;