const User = require('./user');
const BlogPost = require('./blog-post');

User.hasMany(BlogPost, { 
    foreignKey: 'User_Id'
 });

BlogPost.belongsTo(User, {
     foreignKey: 'User_Id' 
});

module.exports = { User, BlogPost };