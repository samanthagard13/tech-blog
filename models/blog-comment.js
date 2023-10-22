const {Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection")

class BlogComment extends Model{}


BlogComment.init(
    {
        body:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

module.exports = BlogComment