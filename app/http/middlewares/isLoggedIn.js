// Login and register route can only be accessed if user is not logged in
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

module.exports = isLoggedIn;