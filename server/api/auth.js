const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { User } = require('../models');

router.use(bodyParser.json());

router.post('/', function(req, res) {
    User.findOne({
        where: {
            username: req.body.username,
        }
    }).then(user => {
        res.json(user.authenticate(req.body.password))
    });
});

module.exports = router;