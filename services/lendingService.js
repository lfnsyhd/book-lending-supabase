const { default: axios } = require('axios');
const Book = require('../models/book');
const Lending = require('../models/lending');
const { Op } = require('sequelize');
require('dotenv').config();

// Function to borrow a book
const borrowBook = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  
  if (!book || !book.available) {
    throw new Error('Book is not available for borrowing');
  }

  const existingLending = await Lending.findOne({
    where: {
      userId,
      returned: false,
    },
  });

  if (existingLending) {
    throw new Error('You can only borrow one book at a time');
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7); // Set due date for 7 days

  const lending = await Lending.create({
    userId,
    bookId,
    dueDate,
    returned: false,
  });

  book.available = false;
  await book.save();

  return lending;
};

// Function to return a borrowed book
const returnBook = async (userId, lendingId) => {
  if(!userId) throw new Error('userId is required');
  if(!lendingId) throw new Error('lendingId is required');

  const lending = await Lending.findOne({
    where: {
      id: lendingId,
      userId,
      returned: false,
    },
  });

  if (!lending) {
    throw new Error('Lending record not found or already returned');
  }

  const book = await Book.findByPk(lending.bookId);
  book.available = true;
  await book.save();

  lending.returned = true;
  lending.returnDate = new Date();
  await lending.save();

  return lending;
};

// Function to get all borrowed books for a user
const getUserBorrowedBooks = async (userId, token) => {
  const filter = {
    returned: false,
  };

  if (userId) {
    filter.userId = userId;
  }

  try {
    const borrowedBooks = await Lending.findAll({
      where: filter,
      include: [
        {
          model: Book,
          required: false,
        }
      ]
    });

    // Convert Sequelize instances to plain objects
    const borrowedBooksWithUserDetails = await Promise.all(
      borrowedBooks.map(async (bookInstance) => {
        const book = bookInstance.toJSON(); // Convert the Sequelize instance to a plain object
        const userResponse = await axios.get(`${process.env.API_AUTH_URL}/detail/${book.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        return {
          ...book, // Merge the plain book data with user details
          User: userResponse.data.user,
        };
      })
    );

    return borrowedBooksWithUserDetails;
  } catch (error) {
    throw new Error('Error fetching borrowed books or user details: ' + error.message);
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getUserBorrowedBooks,
};
