const express = require("express");
const router = express.Router();
const Book = require("./book");

// CREATE a new book
router.post("/books", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    photo: req.body.photo,
    isPublic: req.body.isPublic,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a book by ID
router.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a book by ID
router.put("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, genre },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a book by ID
router.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedBook = await Book.findByIdAndRemove(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
