const router = require('express').Router();
const { BlogPost } = require('../../models/');
const { requireAuth } = require("../../utils/login");

router.post("/", requireAuth, async (req, res) => {
    const username = req.session.username;
  
    // const { title, dateCreated, contents, comments } = req.body;
    const body = req.body;
    try {
      const newPost = await BlogPost.create({
        username,
        ...body,
      });
  
console.log(newPost);

      res
        .status(201)
        .json({ message: "Blog post created successfully", newPost });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;