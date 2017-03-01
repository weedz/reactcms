const express = require('express');
const router = express.Router();

router.use('/news', require('./api/news'));

router.get('/*',(req,res) => {
    res.send('API documentation placeholder');
});

module.exports = router;