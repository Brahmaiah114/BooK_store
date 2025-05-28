const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const booksFile = path.join(__dirname, '../books.json');

function readBooks() {
  const data = fs.readFileSync(booksFile, 'utf-8');
  return JSON.parse(data);
}

function writeBooks(data) {
  fs.writeFileSync(booksFile, JSON.stringify(data, null, 2));
}

// GET all books
router.get('/', (req, res) => {
  const books = readBooks();
  res.json(books);
});

// POST add new book
router.post('/', (req, res) => {
  const books = readBooks();
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    publishedDate: req.body.publishedDate,
    coverImageUrl: req.body.coverImageUrl
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

// PUT update book by id
router.put('/:id', (req, res) => {
  const books = readBooks();
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books[index] = { id, ...req.body };
  writeBooks(books);
  res.json(books[index]);
});

// DELETE book by id
router.delete('/:id', (req, res) => {
  const books = readBooks();
  const id = parseInt(req.params.id);
  const newBooks = books.filter(b => b.id !== id);
  if (newBooks.length === books.length)
    return res.status(404).json({ error: 'Book not found' });

  writeBooks(newBooks);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
