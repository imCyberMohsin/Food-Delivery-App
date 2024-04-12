//! Middleware to Make sure only admin can access the route
function admin(req, res, next) {
    // If loggedIn & Role is 'admin'
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
        // success
    } else {
        return res.redirect('/');
        // Else the user will be redirected to home page
        //! Later on create a page which says ('Stay away kid' If normal user try to access the admin route)
    }

}

module.exports = admin;