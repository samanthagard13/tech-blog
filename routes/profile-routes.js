const router = require('express').Router();
const { BlogPost } = require('../models/');
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

      console.log("Username:", username);
      console.log("User Posts:", userPosts);
    
        res.render("profile", {  userPosts , loggedIn , username });     
    } catch (error) {
      console.error(" Error displaying login page: ", error);     
    }
  });

  router.post('/', requireAuth, async (req, res) => {
    try {
      const { title, dateCreated, contents } = req.body;

      const username = req.session.username;

      const newPost = await BlogPost.create({
        title: title,
        date_created: dateCreated,
        contents: contents,
        username: username,
      });

      res.status(201).json({ message: 'Post created successfully' });

    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Error creating post' });
    }
  });

  module.exports = router;