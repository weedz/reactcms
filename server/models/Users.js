const bcrypt = require('bcrypt');
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
        password_hash: {
            type: DataTypes.STRING,
            field: 'password'
        },
        password: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                this.setDataValue('password', val);
                this.setDataValue('password_hash', bcrypt.hashSync(val, 10));
            }
        },
    }, {
        instanceMethods: {
            authenticate: function(val) {
                if (bcrypt.compareSync(val, this.password_hash)) {
                    return this;
                } else {
                    return false;
                }
            }
        }
    })
};