const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init(
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
        timestamps: false,
        modelName: 'User',
    }
    
);

module.exports = User;