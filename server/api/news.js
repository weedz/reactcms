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
    News.findAll({
        offset: (page-1)*10,
        limit: 10
    }).then(result => {
        res.json(result);
    });
});

router.get('/article/:id', function(req, res) {
    News.scope('article').findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;