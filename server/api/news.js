const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { News } = require('../models');

router.get('/count', function(req, res) {
    News.count().then(count => {
       res.json({
           articles: count
       })
    });
});

// TODO: use cursors to calculate pages
router.get('/archive/:page', function(req, res) {
    const page = Number(req.params.page);
    if (isNaN(page) || page < 1) {
        res.json([]);
        return;
    }
    News.scope('archive',{
        method: ['page',page]
    }).findAndCountAll().then(result => {
        const hash = crypto.createHash('sha256')
            .update(JSON.stringify(result.rows))
            .digest('hex');
        res.set({
            'ETag':hash,
            'Cache-Control':'public, no-cache',
        });
        res.json({
            articles: result.rows,
            count: result.count
        });
    });
});

router.get('/article/:id', function(req, res) {
    News.scope('article').findById(req.params.id).then(result => {
        const hash = crypto.createHash('sha256')
            .update(JSON.stringify(result))
            .digest('hex');
        res.set({
            'ETag':hash,
            'Cache-Control':'public, no-cache',
        });
        res.json(result);
    });
});

module.exports = router;