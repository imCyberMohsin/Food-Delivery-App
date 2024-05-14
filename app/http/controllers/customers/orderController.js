//! Order Controller
const orderModel = require('../../../models/order');    // Orders Model
const moment = require('moment');   // For formatting Date & Time
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

function orderController() {
    return {
        store(req, res) {
            // console.log(req.body);
            //* Validate request
            const { name, phone, address, stripeToken, paymentType } = req.body;
            if (!name || !phone || !address) {
                return res.status(422).json({ message: 'All fields are required' })
                // req.flash('error', 'All fields are required')
                // return res.redirect('/cart');
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
            order.save().then((placedOrder) => {
                //* Stripe Payment 
                if (paymentType === 'card') {
                    return stripe.charges.create({
                        amount: req.session.cart.totalPrice * 100,
                        source: stripeToken,
                        currency: 'inr',
                        description: `Your Order: ${placedOrder._id}`
                    }).then(() => {
                        placedOrder.paymentStatus = true;
                        placedOrder.paymentType = paymentType;
                        // Save the updated order with payment status
                        return placedOrder.save();
                    }).then((updatedOrder) => {
                        // Empty the cart from session of the user when order is placed
                        delete req.session.cart;
                        return res.json({ message: 'Payment successful, Your order is placed' });
                    }).catch((err) => {
                        console.error(err);
                        delete req.session.cart; // Clear cart even if there's an error
                        return res.json({ message: 'Payment Failed, Order Placed As COD' });
                    });
                } else {
                    // Empty the cart from session of the user when order is placed
                    delete req.session.cart;
                    return res.json({ message: 'Order placed successfully' });
                }
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ message: 'Something Went Wrong' });
            });

        },

        async index(req, res) {
            // Fetching orders using customerId
            const orders = await orderModel.find({ customerId: req.user._id }, null, { sort: { createdAt: -1 } });
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); // remove cache
            res.render('ordersPage', { orders: orders, moment: moment });
            // console.log(orders);
        },

        async showStatus(req, res) {
            const order = await orderModel.findById(req.params.id)

            // check if user is authorized with the order
            // if userId === orderId
            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/orderStatusPage', { order: order });
            }
            // redirect to homePage if user was not allowed
            return res.redirect('/');
        }
    }
}

module.exports = orderController;