const fs = require('fs');
const http2 = require('http2');
const config = require('config');
const expressStaticGzip = require("express-static-gzip");
const path = require('path');
const compress = require('compression');
const expressGraphQL = require('express-graphql');
const schema = require('../schema');

const router = require('./router');

module.exports = function(app, express, HOST, PORT, staticPath) {
    express.request.__proto__ = http2.IncomingMessage.prototype;
    express.response.__proto__ = http2.ServerResponse.prototype;
    app.use(compress());

    app.use('/', router);

    app.use('/graphql', expressGraphQL(req => ({
        formatError: console.error,
        graphiql: true,
        schema,
        rootValue: req,
    })));

    app.use(expressStaticGzip(staticPath, {
        enableBrotli: true,
    }));

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(staticPath,'index.html'));
    });

    const tlsOptions = config.get('tlsOptions');

    const options = {
        key: fs.readFileSync(tlsOptions.key),
        cert: fs.readFileSync(tlsOptions.cert),
    };
    const server = http2.createServer(options,app);
    server.listen(PORT, HOST, () => {
        console.info(`App listening on ${HOST}:${PORT}`);
    });
    require('./websocket')(server);
};