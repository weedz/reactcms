'use strict';
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '0.0.0.0';

const express = require('express');
const compress = require('compression');
const path = require('path');
const app = express();

require('../server/setup')(app, express, HOST, PORT, path.resolve(__dirname,'..','build','public'));

app.use(compress());
