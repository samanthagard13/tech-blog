const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.render('home-page');
    } catch (error) {
        console.error('Error rendering main page: ', error);
    }
});

module.exports = router;

router.get('/contact', async (req, res) => {
    try {
        res.render('contact');
    } catch (error) {
        console.error('Error rendering contact page: ', error);
    }
});