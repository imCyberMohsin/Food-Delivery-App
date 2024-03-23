//! All Routes 
const express = require('express')
const router = express.Router()

//? Landing Page / Home
router.get('/', (req, res) => {
    res.render('homePage');
})

//? Cart Page
router.get('/cart', (req, res)=> {
    res.render('cartPage');
})

//? Login Page
router.get('/login', (req, res) => {
    res.render('loginPage');
}) 

//? Signup Page
router.get('/signup', (req, res) => {
    res.render('signupPage');
}) 

module.exports = router;