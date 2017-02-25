const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
app.use('/', require('./app'));
require('./setup')(app);

app.use(express.static(path.join(__dirname, '..','build')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
http.createServer(app).listen(PORT, () => {
    console.info('App listening on port ' + PORT);
});