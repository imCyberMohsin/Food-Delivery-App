//! Order Controller
const orderModel = require('../../../models/order');    // Orders Model
const moment = require('moment');   // For formatting Date & Time

function orderController() {
    return {
        store(req, res) {
            // console.log(req.body);
            //* Validate request
            const { name, phone, address } = req.body;
            if (!name || !phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart');
            }

            //* Creating an order
            const order = new orderModel({
                customerId: req.user._id,
                items: req.session.cart.items,
                name: name,
                phone: phone,
                address: address,
                // Payment default from schema
                // Status default from schema
            });

            //* Save order to DB
            order.save().then((result) => {
                req.flash('success', 'You order is placed')
                // Empty the cart from session of the user when order is placed
                delete req.session.cart;

                return res.redirect('/customer/orders'); // User will be redirected to orders page, after order is placed
            }).catch(err => {
                req.flash('error', 'Failed to place your order')
                return res.redirect('/cart');
                // console.error(err);
            })
        },

        async index(req, res) {
            // Fetching orders using customerId
            const orders = await orderModel.find({ customerId: req.user._id }, null, { sort: { createdAt: -1 } });
            res.render('ordersPage', { orders: orders, moment: moment });
            // console.log(orders);
        },
    }
}

module.exports = orderController;