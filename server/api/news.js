const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/count', function(req, res) {
    const connection = req.app.get('mysql');
    connection.query("select COUNT(id) as count from news", function(err, rows, fields) {
        if (err) {
            console.error('Error: ' + err);
        } else {
            res.json(rows[0].count);
        }
    });
});
router.get('/archive/:page', function(req, res) {
    const page = Number(req.params.page);
    if (isNaN(page) || page < 1) {
        res.json([]);
        return;
    }
    const connection = req.app.get('mysql');
    let q = `select id,title,intro as content from news
 limit ${connection.escape((page - 1) * 10)},10`;

    connection.query(q, function (err, rows, fields) {
        if (err) {
            console.error('Error: ' + err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/article/:id', function(req, res) {
    const connection = req.app.get('mysql');
    const id = connection.escape(req.params.id);
    let q = `select * from news where id = ${id}`;
    connection.query(q, function(err, rows, fields) {
        if (err) {
            console.error('Error: ' + err);
        } else {
            res.json(rows);
        }
    })
});

module.exports = router;