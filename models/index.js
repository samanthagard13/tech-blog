const User = require('./user');
const BlogPost = require('./blog-post');

User.hasMany(BlogPost, { 
    foreignKey: 'user_Id'
 });

BlogPost.belongsTo(User, {
     foreignKey: 'user_Id' 
});

module.exports = { User, BlogPost };