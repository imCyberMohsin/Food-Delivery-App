//! User Schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {     // customer OR admin
        type: String,
        default: 'customer'
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema);