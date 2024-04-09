//! Passport Config used in the main server file app.js 
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

function passportConfig(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        //* check if user with the email exists in the DB
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: 'User Not Found' })
        }

        //* Match Input-password with the DB-password 
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Login Success' })
            }
            return done(null, false, { message: 'Wrong Username or Password' })
        }).catch(err => {
            return done(null, false, { message: 'Some Error Occured' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = passportConfig;