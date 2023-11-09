const router = require("express").Router();
const { BlogPost, User, BlogComment } = require("../models/index");

router.get("/",  async (req, res) => {
  try {     
    const posts = await BlogPost.findAll({
      include: User, BlogComment
    });
    const allPosts = posts.map((post) => post.get({ plain: true }));
    console.log("Dataset: ", allPosts);
    const loggedIn = req.session.loggedIn
 
      res.render("home-page", { allPosts, loggedIn });    
  } catch (error) {
    console.error("Error rendering main page: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/post/:id", async (req, res) => {
  // console.log("Received postId:", req.params.id);
  const postId = req.params.id;
  // console.log(postId);
  try {
    const post = await BlogPost.findByPk(postId, {
      include: [
        User,
        {
          model: BlogComment,
          include: [User],
        }
      ]
    });
    if(post){
      const clickedPost = post.get({plain: true});
      res.render("single-post", clickedPost );
    }
  } catch (error) {
    console.error(" Error displaying post: ", error);
    res.status(404).render("not-found");
  }
});

router.get("/log-in", (req, res) => {  
   if(req.session.loggedIn){
    res.redirect("/")
   } else{
    res.render('log-in')
   }    
});

router.get("/sign-up",  (req, res) => {
  console.log(req.session.loggedIn)
if(req.session.loggedIn){
  res.redirect('/')
}else{
  res.render("sign-up"); 
}  
});

module.exports = router;
