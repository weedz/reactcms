const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');

router.use(bodyParser.json());

router.use((req,res,next) => {
    res.set({
        'Cache-Control':'private, no-store',
    });
    next();
});

router.post('/', function(req, res) {
    User.findOne({
        where: { username: req.body.username }
    }).then(user => {
        if (user) {
            if (user.authenticate(req.body.password)) {
                const secret = config.get('authSecretKey');
                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username'),
                    accessLevel: user.get('accessLevel'),
                }, secret);
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

router.post('/register', function(req, res) {
    const {
        username,
        password,
        email
    } = req.body;
    const validateUsername = new Promise((resolve, reject) => {
        if (username.length >= 4) {
            resolve();
        } else {
            reject('Username is too short');
        }
    });
    const validatePassword = new Promise((resolve, reject) => {
        if (password.length >= 6) {
            resolve();
        } else {
            reject('Password is too short');
        }
    });
    const validateEmail = new Promise((resolve, reject) => {
        const emailRegEx = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (emailRegEx.test(email)) {
            resolve();
        } else {
            reject('Invalid email');
        }

    });

    Promise.all([validateUsername, validatePassword, validateEmail]).then(() => {
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }).then(user => {
            return res.json({
                message: 'User created'
            });
        }).catch(err => {
            console.log(err);
            let error;
            switch (err.errors[0].type) {
                case 'unique violation':
                    if (err.errors[0].message.includes('username')) {
                        error = 'Username is unavailable';
                    } else if (err.errors[0].message.includes('email')) {
                        error = 'Email is unavailable';
                    }
                    break;
                default:
                    error = 'Undefined error';
            }
            return res.json({
                error
            });
        });
    }).catch((error) => {
        return res.json({
            error
        })
    });
});

router.get('/check', function(req,res) {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1];
        if (token) {
            const secret = config.get('authSecretKey');
            try {
                const decoded = jwt.verify(token, secret);
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