const express = require('express');
const Book = require('../models/book');
const router = express.Router();

// Obtener todos los libros
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({message: err.message });
    }
});

// Crear un libro nuevo
router.post('/books', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        pages: req.body.pages
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({message: err.message });
    }
});

// Obtener un libro por su id
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({message: 'Cannot find book'});
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({message: err.message });
    }
});

// Actualizar un libro
router.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(book == null) {
            return res.status(404).json({message: 'Cannot find book'});
        }

        if(req.body.title != null) {
            book.title = req.body.title;
        }
        if(req.body.author != null) {
            book.author = req.body.author;
        }
        if(req.body.publishedDate != null) {
            book.publishedDate = req.body.publishedDate;
        }
        if(req.body.pages != null) {
            book.pages = req.body.pages;
        }

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({message: err.message });
    }
});

// Eliminar un libro
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(book == null) {
            return res.status(404).json({message: 'Cannot find book'});
        }

        await book.deleteOne();
        res.json({ message: 'Deleted book' });
    } catch (err) {
        res.status(500).json({message: err.message });
    }
});

module.exports = router;