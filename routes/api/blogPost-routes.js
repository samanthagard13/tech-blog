const router = require('express').Router();
const { BlogPost, User } = require('../../models/');
const { requireAuth } = require("../../utils/login");

router.post("/",  async (req, res) => {
    const username = req.session.username;
    console.log(username, "username")
    // const { title, dateCreated, contents, comments } = req.body;
    const body = req.body;
    try {
      const newPost = await BlogPost.create({
        username,
        ...body,
      });
  
      console.log(newPost, "its a post")

      res.status(201).json({ message: "Blog post created successfully", newPost });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.get('/post', async(req, res) => {
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