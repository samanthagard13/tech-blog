const router = require('express').Router();
const blogRoutes = require('./blogPost-routes');

router.use('/blog', blogRoutes);

module.exports = router;