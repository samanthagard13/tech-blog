const router = require('express').Router();
const homeRoutes = require('./home-routes');
const { requireAuth } = require('../utils/login');

router.use('/', homeRoutes);

router.use(requireAuth);

module.exports = router;