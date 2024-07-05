const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        trim: true
    },
    author: {
        type: String,
        required: false,
        trim: true
    },
    publishedDate: {
        type: Date,
        required: false
    },
    pages: {
        type: Number,
        required: false
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;