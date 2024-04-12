//! isLoggedIn Middleware
// This middleware will be used to protect the routes(only loggedin users can access) 

function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = auth;