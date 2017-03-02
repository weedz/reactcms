process.env.NODE_ENV = 'production';
const PORT = process.env.PORT || 9000;

const express = require('express');
const expressStaticGzip = require("express-static-gzip");
const path = require('path');
const app = express();
const router = require('./router');

app.use('/', router);
require('./setup')(app);

//app.use(express.static(path.join(__dirname, '..','build')));
app.use("/", expressStaticGzip(path.join(__dirname, '..','build')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.info('App listening on port ' + PORT);
});