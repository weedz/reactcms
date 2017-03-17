const express = require('express');
const router = express.Router();
const { News } = require('../models');

router.get('/count', function(req, res) {
    News.count().then(count => {
       res.json({
           articles: count
       })
    });
});

router.get('/archive/:page', function(req, res) {
    const page = Number(req.params.page);
    if (isNaN(page) || page < 1) {
        res.json([]);
        return;
    }
    News.scope('archive',{
        method: ['page',page]
    }).findAndCountAll().then(result => {
        res.json({
            articles: result.rows,
            count: result.count
        });
    });
});

router.get('/article/:id', function(req, res) {
    News.scope('article').findById(req.params.id).then(result => {
        res.setHeader('Cache-Control','public, max-age=86400');
        res.json(result);
    });
});

module.exports = router;