//! Cart controller

function cartController() {
    return {
        index(req, res) {
            res.render('cartPage');
        },

        update(req, res) {
            //* Structure of data to be stored in session
            // let cart = {
            //     items : {
            //         itemdId: { item: itemObject, qty:0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0,
            // }

            // Check if cart does not exists
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0,
                }
            }
            let cart = req.session.cart

            // Check if item does not exists in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1,
                },
                    cart.totalQty = cart.totalQty + 1,
                    cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                // if already exists increase the quantity
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1,
                    cart.totalQty = cart.totalQty + 1,
                    cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}

module.exports = cartController;