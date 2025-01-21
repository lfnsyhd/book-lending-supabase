const { Op } = require('sequelize');
const Book = require('../models/book');

// Create a new book
const createBook = async (title, author) => {
  const book = await Book.create({ title, author });
  return book;
};

// Get all books with filter
const getBooksWithFilter = async (title, author) => {
  const filter = {};

  if (title) {
    filter.title = { [Op.iLike]: `%${title}%` };
  }

  if (author) {
    filter.author = { [Op.iLike]: `%${author}%` };
  }

  // Mengambil buku dengan filter yang diterapkan
  const books = await Book.findAll({ where: filter });
  return books;
};

// Get a book by its ID
const getBookById = async (bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  return book;
};

// Update a book by its ID
const updateBook = async (bookId, title, author) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  book.title = title;
  book.author = author;
  await book.save();
  return book;
};

// Delete a book by its ID
const deleteBook = async (bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.destroy();
  return book;
};

module.exports = {
  createBook,
  getBooksWithFilter,
  getBookById,
  updateBook,
  deleteBook,
};
