const router = require('express').Router();
const { BlogPost, User } = require('../models/index');

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

router.get('/log-in', (req, res) => {
    try {
        res.render('log-in');
    } catch (error) {
        console.error(' Error displaying login page: ', error);
    }
});

router.get('/sign-up', (req, res) => {
    try {
        res.render('sign-up');
    } catch (error) {
        console.error(' Error displaying login page: ', error);
    }
});


module.exports = router;