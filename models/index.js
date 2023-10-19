const User = require('./user');
const BlogPost = require('./blog-post');

User.hasMany(BlogPost, { 
    foreignKey: 'user_id'
 });

BlogPost.belongsTo(User, {
     foreignKey: 'user_id' 
});

module.exports = { User, BlogPost };