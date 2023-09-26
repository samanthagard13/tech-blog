const router = require('express').Router();
const blogPost = require('../models/blog-post');

router.get('/', async (req, res) => {
    try {
        const posts = await blogPost.findAll();
        res.render('home-page', { posts });
    } catch (error) {
        console.error('Error rendering main page: ', error);
    }
});

router.get('/post', (req, res) => {
    const postId = req.params.id;

    try {
        const post = blogPost.findByPk(postId);

        res.render('single-post', { post });
    } catch (error) {
        console.error(' Error displaying post: ', error);
    }
    
});

router.get('/log-in', (req, res) => {
    try {
        res.render('/log-in');
    } catch (error) {
        console.error(' Error displaying login page: ', error);
    }
});

module.exports = router;
