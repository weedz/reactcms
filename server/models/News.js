module.exports = function(sequelize, DataTypes) {
    return sequelize.define('news', {
        type: {
            type: new DataTypes.VIRTUAL(DataTypes.STRING),
            get() {
                return 'articleType'
            }
        },
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        title: {
            type: DataTypes.STRING,
            field: 'title'
        },
        intro: {
            type: DataTypes.STRING,
            field: 'intro'
        },
        content: {
            type: DataTypes.STRING,
            field: 'content'
        },
        timestamp: {
            type: DataTypes.INTEGER,
            field: 'timestamp'
        },
        authorName: {
            type: DataTypes.STRING,
            field: 'author_name'
        },
        authorId: {
            type: DataTypes.INTEGER,
            field: 'author_id'
        }
    });
};
