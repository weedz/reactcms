'use strict';

const PORT = process.env.PORT || 9000;

const path = require('path');
const fs = require('fs');
const http = require('spdy');
const express = require('express');

const socket = require('../server/websocket');

const app = express();

app.use(function(req, res, next) {
    require('../server/router')(req, res, next);
});
app.use(express.static(path.join(__dirname)));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

const options = {
    key: fs.readFileSync('key.perm'),
    cert: fs.readFileSync('cert.perm'),
};
const server = http.createServer(options, app);
server.listen(PORT, 'localhost', () => {
    console.info('App listening on localhost:' + PORT);
});
socket(server);
