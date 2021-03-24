const mongoose = require('mongoose');

const vidschema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    desc: {
        type: String,
        required: true,
        minlength: 3
    },
    url: {
        type: String,
        required: true,
        minlength: 5
    },
    cat: String,
    posted_by: String,
    likes: String

}, { timestamps: true });

module.exports = mongoose.model('Video', vidschema);