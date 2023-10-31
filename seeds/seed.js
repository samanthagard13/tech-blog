const sequelize = require("../config/connection");
const { User, BlogPost, BlogComment } = require("../models");
const userData = require("./userData.json");
const blogPostData = require("./blogPost.json");
const blogCommentData = require("./blogCommentData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const blogPosts = await BlogPost.bulkCreate(blogPostData);
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

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

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    sequelize.close();
  }
};

seedDatabase();