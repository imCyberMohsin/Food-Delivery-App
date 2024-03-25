//! Cart controller

function cartController() {
    return {
        index(req, res) {
            res.render('cartPage');
        }
    }
}

module.exports = cartController;