const router = require('express').Router();
const { BlogPost, User } = require('../../models/');
const { requireAuth } = require("../../utils/login");

router.post("/",requireAuth,async (req, res) => {
 
    const body = req.body;
    try {
      const newPost = await BlogPost.create({...body, user_id: req.session.user_id});
      res.json(newPost);

      // res.status(201).json({ message: "Blog post created successfully", newPost });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.get('/', async(req, res) => {
    try {
      const postData = await BlogPost.findAll({
        include: [User]
      });
      return res.json(postData)
    } catch (hands) {
      console.error(hands)
      res.status(500).json(hands)
      
    }
  })

  module.exports = router;