const router = require('express').Router();
const { BlogPost, User } = require('../models/');
const { requireAuth } = require("../utils/login");
const { sequelize } = require('../config/connection');
const { findByPk } = require('../models/user');

router.get("/",  requireAuth, async (req, res) => {   
 
    try {
      const loggedIn = req.session.loggedIn;
      const username = req.session.username;

      const userPostsData = await BlogPost.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
     
      const userPosts = userPostsData.map((post) => post.get({plain: true}));
    
      res.render("profile", { loggedIn , username, userPosts });     
      //  res.json(userPosts);
      //  console.log(userPosts);
    } catch (error) {
      console.error(" Error displaying login page: ", error);     
    }
  });

  router.post("/",requireAuth,async (req, res) => {
 
    const body = req.body;
    try {
      const newPost = await BlogPost.create({...body, user_id: req.session.user_id});
      res.json(newPost);

    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete("/:id", async (req, res) => {

    const postId = req.params.id;

    try {
      const post = await BlogPost.findByPk(postId);

      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
    }
  
      await post.destroy();
  
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router;