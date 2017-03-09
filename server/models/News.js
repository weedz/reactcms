module.exports = function(sequelize, DataTypes) {
    return sequelize.define('news', {
        type: {
            type: new DataTypes.VIRTUAL(DataTypes.STRING),
            get() {
                return 'articleType'
            }
        },
        id: {
            type: DataTypes.INTEGER,
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
