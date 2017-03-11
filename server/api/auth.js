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
    }).then(result => {
        if (!result) {
            return res.status(401).send(false);
        }
        const user = result.authenticate(req.body.password);
        if (!user) {
            return res.status(401).send(false);
        } else {
            req.session.user = Object.assign(user);
            return res.json(user);
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
    if (req.session.user) {
        return res.json({
            auth: true
        })
    } else {
        return res.json({
            auth:false
        })
    }
});

module.exports = router;