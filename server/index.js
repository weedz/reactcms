'use strict';
const PORT = process.env.PORT || 9000;

const express = require('express');
const compress = require('compression');
const expressStaticGzip = require("express-static-gzip");
const path = require('path');
const http = require('http2');
const fs = require('fs');

const socket = require('./websocket');
const app = express();
require('express-http2-workaround')({
    express,
    http2:http,
    app
});
const router = require('./router');

app.use(compress());
app.use('/', router);

app.use(expressStaticGzip(path.join(__dirname, '..','build','public'), {
    enableBrotli: true,
}));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build','public','index.html'));
});

const options = {
    key: fs.readFileSync('key.perm'),
    cert: fs.readFileSync('cert.perm'),
};
const server = http.createServer(options, app);
server.listen(PORT, () => {
    console.info('App listening on port ' + PORT);
});
socket(server);