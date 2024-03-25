//! Login & Signup controllers

function authController() {
    return {
        login(req, res) {
            res.render('loginPage');
        },
        signup(req, res) {
            res.render('signupPage');
        }
    }
}

module.exports = authController