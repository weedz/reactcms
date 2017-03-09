const Sequelize =  require('sequelize');
const config = require('config');

//const faker = require('faker');
//const _ = require('lodash');

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

const News = require('./News')(sequelize, Sequelize.DataTypes);

/*News.sync({
    force: true
}).then(function() {
    _.times(15, function() {
        News.create({
            title: faker.lorem.sentence(),
            intro: faker.lorem.paragraph(),
            content: faker.lorem.paragraphs()
        });
    });
});*/

exports.News = News;
exports.sequelize = sequelize;
