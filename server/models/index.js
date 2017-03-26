const Sequelize =  require('sequelize');
const config = require('config');

const faker = require('faker');
const _ = require('lodash');

const dbConfig = config.get('dbConfig');

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, dbConfig.params);

const User = require('./Users')(sequelize, Sequelize.DataTypes);
const News = require('./News')(sequelize, Sequelize.DataTypes, User);
// relations
News.Author = News.belongsTo(User);
User.Articles = User.hasMany(News);

sequelize.sync({
    force: true
}).then(function() {
    _.times(5, function() {
        User.create({
            username: faker.name.firstName(),
            password: faker.lorem.words(1),
            email: faker.internet.email(),
        }).then(user => {
            _.times(3, function() {
                News.create({
                    title: faker.lorem.sentence(),
                    intro: faker.lorem.paragraph(),
                    content: faker.lorem.paragraphs(),
                    userId: user.id
                });
            });
        })
    });
    User.create({
        username: 'weedz',
        password: 'password',
        email: 'weedz@localhost.local',
        accessLevel: 16
    }).then(user => {
        _.times(8, function() {
            News.create({
                title: faker.lorem.sentence(),
                intro: faker.lorem.paragraph(),
                content: faker.lorem.paragraphs(),
                userId: user.id
            });
        });
    });
});

exports.sequelize = sequelize;
exports.News = News;
exports.User = User;
