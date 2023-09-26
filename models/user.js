const sequelize = require('../server');
const { Model, DataTypes } = require('sequelize');

class user extends Model {}

user.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogPost',
    }
    
);

module.exports = user;