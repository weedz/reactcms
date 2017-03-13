'use strict';

const PORT = process.env.PORT || 9000;

const path = require('path');
const http = require('http');
const express = require('express');

const socket = require('../server/websocket');

const app = express();

app.use(function(req, res, next) {
    require('../server/router')(req, res, next);
});
app.use(express.static(path.join(__dirname)));
app.get(/^((?!.+\.js).)*$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

const server = http.createServer(app);
server.listen(PORT, 'localhost', () => {
    console.info('App listening on localhost:' + PORT);
});
socket(server);
