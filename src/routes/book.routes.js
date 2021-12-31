const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books.controllers');
// Retrieve all book
router.get('/', booksController.findAllBooks);
// Create a new book
router.post('/', booksController.createBook);
// Retrieve a single book with id
router.get('/:id', booksController.findOneBook);
// Update a book with id
router.delete('/:id', booksController.deleteBook);
// Delete a book with id
router.put('/:id', booksController.updateBook);
module.exports = router