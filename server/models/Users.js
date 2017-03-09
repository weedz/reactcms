module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        username: {
            type: DataTypes.STRING,
            field: 'username',
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            field: 'password'
        }
    })
};