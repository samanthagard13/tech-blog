const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comments: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'BlogPost',
    }
    
);

module.exports = BlogPost;