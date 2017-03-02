const mysql = require('mysql');

module.exports = function(app) {
    const connection = mysql.createConnection({
		//socketPath: "/var/run/mysqld/mysqld.sock",
        host: 'localhost',
		port: '3306',
        user: 'root',
        password: '',
        database: 'reactcms'
    });
    connection.connect();
    app.set('mysql', connection);
};