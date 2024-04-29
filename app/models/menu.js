//! Food Menu Model
const mongoose = require('mongoose');

// Creating Schema
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "all"
    }
})

// Creating model using schema and exporting
module.exports = mongoose.model('Menu', menuSchema);