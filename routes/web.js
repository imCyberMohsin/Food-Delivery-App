//! All Routes Function 
// GET routes are here
// POST requests of routes are inside /controllers

const allRoutes = (app) => {
    //? Landing Page / Home
    app.get('/', (req, res) => {
        res.render('homePage');
    })

    //? Cart Page
    app.get('/cart', (req, res) => {
        res.render('cartPage');
    })

    //? Login Page
    app.get('/login', (req, res) => {
        res.render('loginPage');
    })

    //? Signup Page
    app.get('/signup', (req, res) => {
        res.render('signupPage');
    })
}

module.exports = allRoutes;
// Exporting allRoutes function
// Import web.js in app.js and call the function to use 