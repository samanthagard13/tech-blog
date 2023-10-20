const router = require('express').Router();
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');
const apiRoutes = require('./api/')
const { requireAuth } = require('../utils/login');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);

router.use(requireAuth);

module.exports = router;