//! Home Controller

function homeController() {
    return {
        home(req, res) {
            res.render('homePage');
        }
    }
}

// Exporting the controllers
// To use, import in the routes
module.exports = homeController