const router = require("express").Router();
const { User } = require("../../models/");


router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
    });
    
    res.json(newUser);
  } catch (error) {
    console.error("sign up unsuccessful: ", error);
  }
});

router.post("/log-in", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "nobody there" });
    }

    const goodPassword = user.checkPassword(req.body.password);

    if (!goodPassword) {
      return res.status(401).json({ message: "ya blew it" });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.status(200).json({ user, message: "you logged in dood" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.post("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
      } else {
        if (req.session) {
          req.session.loggedIn = false;
        }
        res.redirect("/");
      }
    });
  } else {
    res.status(500).send("Internal Server Error");
  }
});


  router.get('/users', async (req,res)=> {

    try{
      console.log(User, "ypyoyooyo")
      const users = await User.findAll()
      console.log(users)
       return res.json(users)
    }catch (hands){
      console.error(hands)
      res.status(500).json(hands)
    }
    
  })
  

module.exports = router;
