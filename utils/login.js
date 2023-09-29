function validatePasswordLength(req, res, next) {
    const { password } = req.body;
  
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    next();
  };

  const requireAuth = (req, res, next) => {
    if (req.session.user_id) {
        // User is logged in
        res.locals.loggedIn = true;
    } else {
        // User is not logged in
        res.locals.loggedIn = false;
    }
    next();
};
  
  module.exports = {
    validatePasswordLength,
    requireAuth,
  }
  