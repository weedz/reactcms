module.exports = function(sequelize, DataTypes, User) {
    return sequelize.define('news', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        title: {
            type: DataTypes.TEXT,
            field: 'title'
        },
        intro: {
            type: DataTypes.TEXT,
            field: 'intro'
        },
        content: {
            type: DataTypes.TEXT,
            field: 'content'
        },
    }, {
        scopes: {
            archive: {
                attributes: ['id','title','intro','userId','createdAt'],
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            },
            article: {
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            },
            page: function(page) {
                return {
                    offset: (page - 1) * 10,
                    limit: 10
                }
            }
        }
    })
};
