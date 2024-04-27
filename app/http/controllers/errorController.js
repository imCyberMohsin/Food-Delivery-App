//! Error Controller

function errorController() {
    return {
        err(req, res) {
            return res.render('errorPage');
        }
    }
}

module.exports = errorController