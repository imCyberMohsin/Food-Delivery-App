//! Admin Status Controller
const orderModel = require('../../../models/order');

function statusController() {
    return {
        // Update order status in the DB
        async update(req, res) {
            // Replace status of order with whatever the admin click on the admin page.
            try {
                await orderModel.updateOne({ _id: req.body.orderId }, { status: req.body.status })
                return res.redirect('/admin/orders');
            } catch (err) {
                console.error(err);
                return res.redirect('/admin/orders');
            };
        }
    }
}

module.exports = statusController;