'use strict';

process.env.NODE_ENV = 'development';
const DEFAULT_PORT = process.env.PORT || 9000;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const config = require('./webpack.dev.config.js');
const compiler = webpack(config);
const http = require('http');
const express = require('express');
const app = express();
app.use(function(req, res, next) {
    require('../server/app')(req, res, next);
});
require('../server/setup')(app);

let server;

function setupApp() {
    app.get(/\/(?!.*\.js)(?!__webpack.*).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
    });
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10000
    }));
}
function startServer() {
    setupApp();
    server = http.createServer(app);
    server.listen(DEFAULT_PORT, 'localhost', () => {
        console.info('App listening on port ' + DEFAULT_PORT);
    });
}
startServer();

const watch = require('watch');
watch.createMonitor(path.resolve(__dirname, '..','server'), (monitor) => {
    monitor.on('changed', (f, stat) => {
        console.log('Changed: ' + f + ', Time: ' + stat.mtime);
        Object.keys(require.cache).forEach((id) => {
            delete require.cache[id];
        });
    });
});