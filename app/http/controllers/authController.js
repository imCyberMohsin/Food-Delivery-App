//! Login & Signup controllers
const userModel = require('../../models/user');
const bcrypt = require('bcrypt');

function authController() {
    return {
        // Login
        login(req, res) {
            res.render('loginPage');
        },

        // Signup
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
                res.redirect('/');
            }).catch(err => {
                req.flash('error', 'Failed to signup!');
                return res.redirect('/signup');
            })
            // console.log(req.body);
        }
    }
}

module.exports = authController;