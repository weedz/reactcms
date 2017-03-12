const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));
/*router.use(session({
    secret:'mySecret',
    resave: false,
    saveUninitialized: true,
}));*/

router.use('/news', require('./api/news'));
router.use('/auth', require('./api/auth'));

router.get('/*',(req,res) => {
    res.send('API documentation placeholder');
});

module.exports = router;