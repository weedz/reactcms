const mysql = require('mysql');

module.exports = function(app) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'reactcms'
    });
    connection.connect();
    app.set('mysql', connection);
};