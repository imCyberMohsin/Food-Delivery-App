//! All Routes Function 
// All the routes are here
// Logic of routes are inside /controllers

//* Importing controllers 
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const guest = require('../app/http/middlewares/guest');

const allRoutes = (app) => {
    //? Home Route
    app.get('/', homeController().home); // using controller as a callback function

    //? Cart Route
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    //? Orders/Customer Route
    app.post('/orders', orderController().store)
    app.get('/customer/orders', orderController().index)

    //? Login Route
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)

    //? Signup Route
    app.get('/signup', guest, authController().signup)
    app.post('/signup', authController().postSignup)

    //? Logout Route 
    app.get('/logout', authController().logout)
}

module.exports = allRoutes;
// Exporting allRoutes function
// Import web.js in app.js and call the function to use 