'use strict';

const PORT = process.env.PORT || 9000;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const http = require('http');
const express = require('express');

const config = require('./webpack.dev.config.js');
const compiler = webpack(config);
const socket = require('../server/websocket');

const app = express();

app.use(function(req, res, next) {
    require('../server/router')(req, res, next);
});

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
    server.listen(PORT, 'localhost', () => {
        console.info('App listening on localhost:' + PORT);
    });
    socket(server);
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