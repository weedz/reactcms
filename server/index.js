const PORT = process.env.PORT || 9000;

const express = require('express');
const expressStaticGzip = require("express-static-gzip");
const path = require('path');
const http = require('http');

const socket = require('./websocket');
const app = express();
const router = require('./router');

app.use('/', router);

//app.use(express.static(path.join(__dirname, '..','build')));
app.use("/", expressStaticGzip(path.join(__dirname, '..','build','public')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build','public','index.html'));
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.info('App listening on port ' + PORT);
});
socket(server);