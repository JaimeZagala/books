const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/books', async (req, res) => {
	try {
		const books = await Book.find();
		return res.json(books);
	} catch(err) {
		return res.status(500).json({message: err.message});
	}
});

router.post('/books', async (req, res) => {
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		publishedDate: req.body.publishedDate,
		pages: req.body.pages,
		image: req.body.image
	});

	try {
		const newBook = await book.save();
		return res.status(201).json(newBook);
	} catch(err) {
		return res.status(400).json({message: err.message});
	}
});

router.get('/books/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if(!book) return res.status(404).json({message: `Cannot find book`});
		return res.json(book);
	} catch(err) {
		return res.status(500).json({message: err.message});
	}
});

router.put('/books/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if(!book) return res.status(404).json({message: `Cannot find book`});

		if(req.body.title) book.title = req.body.title;
		if(req.body.author) book.author = req.body.author;
		if(req.body.publishedDate) book.publishedDate = req.body.publishedDate;
		if(req.body.pages) book.pages = req.body.pages;
		if(req.body.image) book.image = req.body.image;

		const updatedBook = await book.save();
		return res.json(updatedBook);
	} catch(err) {
		return res.status(400).json({message: err.message});
	}
});

router.delete('/books/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if(!book) return res.status(404).json({message: `Cannot find book`});

		await book.deleteOne();
		return res.json({message: `Deleted book`});
	} catch(err) {
		return res.status(500).json({message: err.message});
	}
});

module.exports = router;