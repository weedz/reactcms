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
            unique: true,
            set: function(val) {
                this.setDataValue('username', val.toLowerCase());
            }
        },
        accessLevel: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        passwordHash: {
            type: DataTypes.STRING,
            field: 'password'
        },
        password: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                this.setDataValue('password', val);
                this.setDataValue('passwordHash', bcrypt.hashSync(val, 10));
            }
        },
    }, {
        instanceMethods: {
            authenticate: function(val) {
                return bcrypt.compareSync(val, this.passwordHash)
            }
        }
    })
};