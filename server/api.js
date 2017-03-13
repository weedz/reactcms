const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use('/news', require('./api/news'));
router.use('/auth', require('./api/auth'));

router.get('/*',(req,res) => {
    res.send('API documentation placeholder');
});

module.exports = router;