const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	author: {
		type: String,
		required: true,
		trim: true
	},
	publishedDate: {
		type: Date,
		required: true
	},
	pages: {
		type: Number,
		required: true
	},
	image: {
		type: String
	}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;