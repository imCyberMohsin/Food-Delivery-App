//! Admin Order Controller
const orderModel = require('../../../models/order');

function orderController() {
    return {
        async index(req, res) {
            try {
                const orders = await orderModel
                    .find({ status: { $ne: 'completed' } })
                    .sort({ 'createdAt': -1 })
                    .populate('customerId', '-password')
                    .exec();

                if (req.xhr) {
                    return res.json(orders);
                } else {
                    return res.render('Admin/ordersPageAdmin', { orders });
                }
            } catch (err) {
                // Handle error
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
        },
    };
}

module.exports = orderController;