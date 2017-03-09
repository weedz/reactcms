module.exports = function(sequelize, DataTypes, Users) {
    return sequelize.define('news', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        title: {
            type: DataTypes.TEXT('tiny'),
            field: 'title'
        },
        intro: {
            type: DataTypes.TEXT('medium'),
            field: 'intro'
        },
        content: {
            type: DataTypes.TEXT('long'),
            field: 'content'
        },
    }, {
        scopes: {
            archive: {
                attributes: ['id','title','intro','authorId','createdAt'],
                include: [{
                    model: Users,
                    as: 'author',
                    attributes: ['username']
                }]
            },
            article: {
                include: [{
                    model: Users,
                    as: 'author',
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
    });
};
