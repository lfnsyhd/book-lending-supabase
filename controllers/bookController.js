import bookService from '../services/bookService.js';

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = await bookService.createBook(title, author);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const { title, author } = req.query;
    const books = await bookService.getBooksWithFilter(title, author);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.bookId);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.bookId, req.body);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookService.deleteBook(req.params.bookId);
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};