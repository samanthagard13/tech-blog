const router = require('express').Router();
const { BlogPost } = require('../models/');
const { requireAuth } = require("../utils/login");

router.get("/",  requireAuth, async (req, res) => {   
 
    try {
      const loggedIn = req.session.loggedIn;
      const username = req.sessionID.ussername;

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

  module.exports = router;