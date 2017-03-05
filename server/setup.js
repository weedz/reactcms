const Sequelize = require('sequelize');
const config = require('config');
const dbConfig = config.get('dbConfig');

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.type
});

const News = sequelize.define('news', {
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    intro: {
        type: Sequelize.STRING,
        field: 'intro'
    },
    content: {
        type: Sequelize.STRING,
        field: 'content'
    },
    timestamp: {
        type: Sequelize.INTEGER,
        field: 'timestamp'
    },
    authorName: {
        type: Sequelize.STRING,
        field: 'author_name'
    },
    authorId: {
        type: Sequelize.INTEGER,
        field: 'author_id'
    }
});
News.sync({
    force: true
}).then(() => {
    News.create({
        title: 'Article 1',
        intro: 'Small headline for article 1',
        content: 'Article body.',
        authorName: 'Author',
        authorId: 1
    });
});

module.exports = function(app) {
    app.set('_db', {
        News
    });
};