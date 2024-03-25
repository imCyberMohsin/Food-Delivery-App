//! All Routes Function 
// All the routes are here
// Logic of routes are inside /controllers

//* Importing controllers 
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')

const allRoutes = (app) => {
    //? Home Page
    app.get('/', homeController().home); // using controller as a callback function

    //? Cart Page
    app.get('/cart', cartController().index)

    //? Login Page
    app.get('/login', authController().login)

    //? Signup Page
    app.get('/signup', authController().signup)
}

module.exports = allRoutes;
// Exporting allRoutes function
// Import web.js in app.js and call the function to use 