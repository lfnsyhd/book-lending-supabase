const lendingService = require('../services/lendingService');

// Endpoint to borrow a book
const borrowBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const lending = await lendingService.borrowBook(userId, bookId);
    res.status(200).json(lending);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Endpoint to return a borrowed book
const returnBook = async (req, res) => {
  try {
    const { lendingId, userId } = req.body;
    const lending = await lendingService.returnBook(userId, lendingId);
    res.status(200).json(lending);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Endpoint to view borrowed books
const getUserBorrowedBooks = async (req, res) => {
  try {
    const { userId } = req.query;
    const token = req.header('Authorization')?.split(' ')[1];
    
    const books = await lendingService.getUserBorrowedBooks(userId, token);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getUserBorrowedBooks,
};
