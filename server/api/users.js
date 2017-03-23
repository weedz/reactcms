const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { User } = require('../models');

router.get('/all', (req,res) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1];
        if (token) {
            const secret = config.get('authSecretKey');
            try {
                const verified = jwt.verify(token, secret);
                if (verified) {
                    return User.findAndCountAll().then(result => res.json({
                        users: result.rows,
                        count: result.count
                    }));
                }
            } catch (err) {
                return res.status(401).json({
                    message: 'Not authorized'
                });
            }
        }
    }
    return res.status(401).json({
        message: 'Not authorized'
    });
});

module.exports = router;