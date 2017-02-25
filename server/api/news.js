const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//const parser = require('body-parser');
//const jsonParser = parser.json();

router.post('/:id', function(req, res) {
    const connection = req.app.get('_store').mysql;
    let str = "select * from news";
    if (req.params.id != 'all') {
        str += ' where id = ' + connection.escape(req.params.id);
    }
    connection.query(str, function(err, rows, fields) {
        if (err) {
            console.error('Error: ' + err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;