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
                }, 'secretkey');
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

router.get('/check', function(req,res) {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, 'secretkey');
                return res.json(decoded);
            } catch (err) {
                return res.status(401).json({
                    errors: 'Not authorized'
                })
            }
        }
    }
    return res.status(401).json({
        errors: 'Not authorized'
    })
});

module.exports = router;