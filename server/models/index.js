const Sequelize =  require('sequelize');
const config = require('config');

const faker = require('faker');
const _ = require('lodash');

const dbConfig = config.get('dbConfig');

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, dbConfig.params);

const Users = require('./Users')(sequelize, Sequelize.DataTypes);
const News = require('./News')(sequelize, Sequelize.DataTypes, Users);
News.belongsTo(Users, {as: 'author'});

sequelize.sync({
    force: true
}).then(function() {
    Users.create({
        username: 'WeeDz',
        password: 'password'
    }).then(user => {
        _.times(15, function() {
            News.create({
                title: faker.lorem.sentence(),
                intro: faker.lorem.paragraph(),
                content: faker.lorem.paragraphs(),
                authorId: user.id
            });
        });
        /*Users.findById(1).then(user => {
            console.log(user.authenticate('password'));
        });*/
    });
});

exports.sequelize = sequelize;
exports.News = News;
exports.Users = Users;
