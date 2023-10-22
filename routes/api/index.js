const router = require('express').Router();
const blogRoutes = require('./blogPost-routes');
const blogUserRoutes = require('./blogUser');
const blogCommentRoute = require('./blogCommentRoute')

router.use('/blog', blogRoutes);
router.use('/blogUser', blogUserRoutes)
router.use('/blogComment', blogCommentRoute)

module.exports = router;