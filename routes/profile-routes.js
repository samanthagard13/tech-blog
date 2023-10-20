const router = require('express').Router();
const { BlogPost } = require('../models/');
const { requireAuth } = require("../utils/login");

router.get("/", requireAuth, async (req, res) => {
    const { username, user_id } = req.session.user;
  
    try {
      const userPosts = await BlogPost.findAll({
        where: {
          user_id: user_id,
        },
      });
  
      res.render("profile", { username, userPosts });
    } catch (error) {
      console.error(" Error displaying login page: ", error);
    }
  });

  module.exports = router;