//! Search Food Controller 
const menuModel = require('../../models/menu');

function searchController() {
    return {
        async search(req, res) {
            try {
                // Retrieve search term from query parameters
                const search = req.query.search ? req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';

                // Find items matching the search term
                const itemData = await menuModel.find({ "name": { $regex: new RegExp(search, 'i') } });

                if (itemData.length > 0) {
                    // Send the found items as response to the frontend
                    // res.status(200).send({ data: itemData });
                    res.render('searchPage', { foodItems : itemData })
                } else {
                    // res.status(404).send({ message: 'No items found matching the search criteria.' });
                    res.redirect('/#items');
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'An internal server error occurred.' });
            }
        }
    }
}

module.exports = searchController;