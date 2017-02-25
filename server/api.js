const express = require('express');
const router = express.Router();

router.use('/news', require('./api/news'));

module.exports = router;