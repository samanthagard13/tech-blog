const router = require("express").Router();
const { post } = require("jquery");
const { BlogPost, User } = require("../models/index");
const { validatePasswordLength, requireAuth } = require("../utils/login");
const bcryptjs = require("bcryptjs");

router.get("/", requireAuth, async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    const allPosts = posts.map((post) => post.get({ plain: true }));

    res.render("home-page", { allPosts });
  } catch (error) {
    console.error("Error rendering main page: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/post/:id", async (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  try {
    const post = await BlogPost.findByPk(postId);

    res.render("single-post", { post });
  } catch (error) {
    console.error(" Error displaying post: ", error);
    res.status(404).render("not-found");
  }
});

router.get("/log-in", async (req, res) => {
  try {
    res.render("log-in");
  } catch (error) {
    console.error(" Error displaying login page: ", error);
  }
});

router.post("/log-in", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !user.checkPassword(password)) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    req.session.user = {
      username: user.username,
      password: user.password,
      user_id: user.id,
    };

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/sign-up", async (req, res) => {
  try {
    res.render("sign-up");
  } catch (error) {
    console.error(" Error displaying login page: ", error);
  }
});

router.post("/sign-up", validatePasswordLength, async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    res.redirect("/log-in");
  } catch (error) {
    console.error("sign up unsuccessful: ", error);
  }
});

router.get("/profile/:user_id", requireAuth, async (req, res) => {
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

router.post("/profile/:user_id", requireAuth, async (req, res) => {
  const username = req.session.username;

  const { title, dateCreated, contents, comments } = req.body;
  try {
    const newPost = await BlogPost.create({
      username,
      title,
      dateCreated,
      contents,
      comments,
    });

    res
      .status(201)
      .json({ message: "Blog post created successfully", newPost });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
