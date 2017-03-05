const Sequelize = require('sequelize');

module.exports = function(app) {
    const config = require('config');
    const dbConfig = config.get('dbConfig');

    let params = {
        logging: process.env.NODE_ENV !== 'development' ? false : console.log,
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
    News.sync();

    app.set('_db', {
        News
    });
};