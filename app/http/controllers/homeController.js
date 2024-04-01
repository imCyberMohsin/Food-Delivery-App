//! Home Controller
const menuModel = require('../../models/menu');

function homeController() {
    return {
        async home(req, res) {
            const foodItems = await menuModel.find();
            res.render('homePage', { food: foodItems });
            // console.log(foodItems);
        }
    }
}

// Exporting the controllers
// To use, import in the routes
module.exports = homeController