const mysql = require('mysql');

module.exports = function(app) {
    // Uncomment to use mysql
    /*const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'reactjs'
    });
    connection.connect();
    app.set('_store', {
        mysql: connection
    });*/
};