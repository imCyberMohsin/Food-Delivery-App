//! Login & Signup controllers
const userModel = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');   // passport.js for login

function authController() {
    return {
        //? Login
        login(req, res) {
            res.render('loginPage');
        },
        postLogin(req, res, next) {
            const { email, password } = req.body
            //* Validations and display flash error
            if (!email || !password) {
                req.flash('error', 'Fields are empty!');
                // storing the input data before refreshing the page
                return res.redirect('/login');
            }

            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err);
                }

                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login');
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err);
                    }
                    // Redirect home page if user is found and login is successful
                    return res.redirect('/');
                })
            })(req, res, next);
        },

        //? Signup
        signup(req, res) {
            res.render('signupPage');
        },
        async postSignup(req, res) {
            const { name, email, password } = req.body
            //* Validations and display flash error
            if (!name || !email || !password) {
                req.flash('error', 'Fields are empty!');
                // storing the input data before refreshing the page
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/signup');
            }

            //* Check if email already exists
            const existingUser = await userModel.findOne({ email: email });
            if (existingUser) {
                req.flash('error', 'Email Already Exists');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/signup');
            }

            //* Hash Password using Bcrypt before storing it in the DB
            const hashedPassword = await bcrypt.hash(password, 10);

            //* Create user using the model and data from the form input 
            const user = new userModel({
                name: name,
                email: email,
                password: hashedPassword
            })

            //* Save to DB 
            user.save().then((user) => {
                // if user is created - redirect to login page
                return res.redirect('/login');
            }).catch(err => {
                req.flash('error', 'Failed to signup!');
                return res.redirect('/signup');
            })
            // console.log(req.body);
        },

        //? Logout
        logout(req, res) {
            req.logout(); // function by Passport to logout the user
            req.flash('success_msg', 'You have been logged out successfully'); // flash a success message
            res.redirect('/'); // Redirect the user to Home page
        }
    }
}

module.exports = authController;