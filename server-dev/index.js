'use strict';

const express = require('express');
const path = require('path');
const app = express();
require('../server/setup')(app, express, 'localhost', 9000, path.resolve(__dirname));
