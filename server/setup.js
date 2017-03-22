const fs = require('fs');
const spdy = require('spdy');
const config = require('config');
const expressStaticGzip = require("express-static-gzip");
const path = require('path');
const compress = require('compression');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const router = require('./router');

module.exports = function(app, express, HOST, PORT, staticPath) {

    app.use(compress());

    app.use('/', router);

    app.use('/graphql', expressGraphQL({
        graphiql: true,
        pretty: true,
        schema,
    }));

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
    const server = spdy.createServer(options, app);
    server.listen(PORT, HOST, () => {
        console.info(`App listening on ${HOST}:${PORT}`);
    });
    require('./websocket')(server);
};