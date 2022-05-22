const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReactAuth'
    },

    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})


const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog
