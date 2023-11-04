const router = require('express').Router();
const { BlogPost, User } = require('../models/');
const { requireAuth } = require("../utils/login");
const { sequelize } = require('../config/connection');

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
    
        res.render("profile", {  userPosts , loggedIn , username });     
        // res.json(userPosts);
console.log(userPosts);
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

  module.exports = router;