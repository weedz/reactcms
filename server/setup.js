const mysql = require('mysql');
const config = require('config');

module.exports = function(app) {
    const dbConfig = config.get('dbConfig');
    let params = {
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.dbName
    };
    if (dbConfig.has('socketPath')) {
        params.socketPath = dbConfig.socketPath;
    } else {
        params.host = dbConfig.host;
        params.port = dbConfig.port;
    }
    const connection = mysql.createConnection(params);
    connection.connect();
    app.set('mysql', connection);
};