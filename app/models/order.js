//! Orders Model
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // Here customerId is the data association of 'user'
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    paymentType: {
        type: String,
        default: 'COD'
    },
    status: {
        type: String,
        default: 'order_placed'
    }
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);