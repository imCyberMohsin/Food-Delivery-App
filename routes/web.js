//! All Routes Function 
// All the routes are here
// Logic of routes are inside /controllers

//* Controllers 
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusOrderController = require('../app/http/controllers/admin/statusController')
const errorController = require('../app/http/controllers/errorController')
const searchController = require('../app/http/controllers/searchController')

//* Middlewares 
const guest = require('../app/http/middlewares/guest');             // LoggedIn user cannot access /login & /signup only Guests can
const isLoggedIn = require('../app/http/middlewares/isLoggedIn');   // Protect Routes to avoid access without login
const admin = require('../app/http/middlewares/admin');             // Protect Routes from other users(only admins can access the route)

//* Routes 
const allRoutes = (app) => {
    //? Home Route
    app.get('/', homeController().home); // using controller as a callback function

    //? Cart Route
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    //? Orders/Customer Route
    app.post('/orders', isLoggedIn, orderController().store)
    app.get('/customer/orders', isLoggedIn, orderController().index)
    app.get('/customer/orders/:id', isLoggedIn, orderController().showStatus) // order status user

    //? Admin Routes (Can only be accessed by Admins)
    app.get('/admin/orders', admin, adminOrderController().index);
    app.post('/admin/order/status', admin, statusOrderController().update);

    //? Login Route
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)

    //? Signup Route
    app.get('/signup', guest, authController().signup)
    app.post('/signup', authController().postSignup)

    //? Logout Route 
    app.get('/logout', authController().logout)

    //? Search Route
    app.get('/search', searchController().search)

    //? Error Route 
    app.get('*', errorController().err)
}

module.exports = allRoutes;
// Exporting allRoutes function
// Import web.js in app.js and call the function to use 