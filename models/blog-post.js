const sequelize = require('../server'); 
const { Model, DataTypes } = require('sequelize');

class blogPost extends Model {}

blogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: 'blogPost',
    }
    
);

module.exports = blogPost;