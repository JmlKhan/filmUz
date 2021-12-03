const mongoose = require('mongoose');

const Post = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You have to input title']
    },
    category: String,
    content: String,
    image: String,
    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Post', Post);
