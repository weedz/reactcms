const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');

router.use(bodyParser.json());

router.post('/', function(req, res) {
    User.findOne({
        where: { username: req.body.username }
    }).then(user => {
        if (user) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username')
                }, 'secret');
                return res.json({token});
            } else {
                return res.status(401).json({
                    errors: {form: 'Invalid credentials'}
                });
            }
        } else  {
            return res.status(401).json({
                errors: {form: 'Invalid credentials'}
            });
        }
    });
});

router.post('/test', (req, res) => {
    req.session.auth = {
        auth: 'Test'
    };
    res.send('Authorized');
});
router.get('/test', (req, res) => {
    req.session.auth = {
        auth: 'Test'
    };
    res.json({
        message:'Authorized'
    });
});
router.get('/testcheck', (req, res) => {
    if (req.session.auth) {
        return res.json(req.session.auth)
    } else {
        res.status(401);
        return res.json({
            auth: false
        });
    }
});

router.get('/check', function(req,res) {
    console.log(req.session);
    res.send(false);
});

module.exports = router;