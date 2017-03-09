const Sequelize =  require('sequelize');
const config = require('config');

const dbConfig = config.get('dbConfig');

let params = {
    logging: false,
    dialect: dbConfig.dialect,
    dialectOptions: {}
};
if (dbConfig.has('socketPath')) {
    params.dialectOptions.socketPath = dbConfig.socketPath;
} else {
    params.host = dbConfig.host;
    params.port = dbConfig.port;
}
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, params);

const News = sequelize.import('News');

exports.News = News;
exports.sequelize = sequelize;
