const User = require('./user');
const BlogPost = require('./BlogPost');
const BlogComment = require('./blog-comment')


BlogPost.belongsTo(User, {
     foreignKey: 'user_id',
     onDelete: 'CASCADE'
});

BlogPost.hasMany(BlogComment, {
     foreignKey: "blog_id",
     onDelete:'CASCADE'
});

BlogComment.belongsTo(User, {
     foreignKey: 'user_id',
     onDelete: 'CASCADE'
})

module.exports = { User, BlogPost, BlogComment };