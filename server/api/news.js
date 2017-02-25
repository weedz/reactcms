const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.post('/:page', function(req, res) {
    const connection = req.app.get('_store').mysql;
    let q = "select id,title,SUBSTRING(content,1,100) as content from news";
    if (req.params.page) {
        const page = req.params.page*20;
        if (!isNaN(page)) {
            q += ' limit ' + connection.escape(page) + ',20'
        }
    }
    connection.query(q, function(err, rows, fields) {
        if (err) {
            console.error('Error: ' + err);
        } else {
            res.json(rows);
        }
    });
});
router.post('/article/:id', function(req, res) {
    const connection = req.app.get('_store').mysql;
    let q = "select * from news where id = " + connection.escape(req.params.id);
    connection.query(q, function(err, rows, fields) {
        if (err) {
            console.error('Error: ' + err);
        } else {
            res.json(rows);
        }
    })
});

module.exports = router;