const sequelize = require("../config/connection");
const { User, BlogPost, BlogComment } = require("../models");

const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const blogCommentData = require("./blogCommentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogPosts = await BlogPost.bulkCreate(blogPostData);

  for (const post of blogPosts) {
    const numComments = Math.floor(Math.random() * 5);

    for (let i = 0; i < numComments; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomComment = blogCommentData[Math.floor(Math.random() * blogCommentData.length)];

      await BlogComment.create({
        body: randomComment.body,
        user_id: randomUser.id,
        blog_id: post.id,
      });
    }
  }

  process.exit(0);
};

seedDatabase();