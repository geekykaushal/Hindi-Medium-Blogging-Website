const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    },

    date: {
        type: Date,
        default: Date.now
    },

    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog'
        }
    ]
})

const User = mongoose.model('ReactAuth', userSchema)
module.exports = User