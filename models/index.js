const user = require('./user');
const blogPost = require('./blog-post');

user.hasMany(blogPost, { 
    foreignKey: 'userId'
 });

blogPost.belongsTo(user, {
     foreignKey: 'userId' 
});

module.exports = { user, blogPost };