const Sequelize =  require('sequelize');
const config = require('config');

const faker = require('faker');
const _ = require('lodash');

const dbConfig = config.get('dbConfig');

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, dbConfig.params);

const User = require('./Users')(sequelize, Sequelize.DataTypes);
const News = require('./News')(sequelize, Sequelize.DataTypes, User);
News.belongsTo(User, {as: 'author'});

sequelize.sync({
    force: true
}).then(function() {
    User.create({
        username: 'weedz',
        password: 'password',
        email: 'weedz@localhost'
    }).then(user => {
        _.times(15, function() {
            News.create({
                title: faker.lorem.sentence(),
                intro: faker.lorem.paragraph(),
                content: faker.lorem.paragraphs(),
                authorId: user.id
            });
        });
    });
});

exports.sequelize = sequelize;
exports.News = News;
exports.User = User;
