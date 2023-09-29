const router = require('express').Router();
const { BlogPost, User } = require('../models/index');
const { validatePasswordLength } = require('../utils/login');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.findAll();
        res.render('home-page', { posts });
    } catch (error) {
        console.error('Error rendering main page: ', error);
    }
});

router.get('/post/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await BlogPost.findByPk(postId);

        res.render('single-post', { post });
    } catch (error) {
        console.error(' Error displaying post: ', error);
        res.status(404).render('not-found');
    }
    
});

router.get('/log-in', async (req, res) => {
    try {
        res.render('log-in');
    } catch (error) {
        console.error(' Error displaying login page: ', error);
    }
});

router.post('/log-in', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
  
      if (!user || !user.checkPassword(password)) {
        return res.status(401).json({ message: 'Invalid login credentials' });
      }
  
      req.session.user_id = user.id;

      res.redirect('/');
      //res.status(200).json({ message: 'Login successful', user });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.get('/sign-up', async (req, res) => {
    try {
        res.render('sign-up');
    } catch (error) {
        console.error(' Error displaying login page: ', error);
    }
});

router.post('/sign-up', validatePasswordLength, async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, password: hashedPassword });

        res.redirect('/log-in');
      } catch (error) {
        console.error('sign up unsuccessful: ', error);
    }
});

router.get('/profile', (req, res) => {
    try {
        res.render('profile');
    } catch (error) {
        console.error(' Error displaying login page: ', error);
    }
})


module.exports = router;