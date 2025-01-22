import dotenv from 'dotenv';
import supabase from '../supabase.js';
import bookService from './bookService.js';
dotenv.config();

// Function to borrow a book
const borrowBook = async (userId, bookId) => {
  const book = await bookService.getBookById(bookId);

  if (!book || !book.available) {
    throw new Error('Book is not available for borrowing');
  }

  const { data: existingLending, error: errorExistingLending } = await supabase
    .from('Lendings')
    .select('*')
    .eq('userId', userId)
    .eq('returned', false)
    .single();

  if (existingLending) {
    throw new Error('You can only borrow one book at a time');
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7); // Set due date for 7 days

  const { data: lending, error: errorLanding } = await supabase.from("Lendings")
    .insert({
      userId,
      bookId,
      dueDate,
      returned: false,
    })
    .select('*')
    .single();

  if (errorLanding) throw errorLanding;

  await bookService.updateBook(bookId, { available: false });
  return lending;
};

// Function to return a borrowed book
const returnBook = async (userId, lendingId) => {
  if (!userId) throw new Error('userId is required');
  if (!lendingId) throw new Error('lendingId is required');

  const { data: lending, error } = await supabase
    .from('Lendings')
    .select('*')
    .match({
      id: lendingId,
      userId,
      returned: false,
    })
    .single();

  if (!lending) {
    throw new Error('Lending record not found or already returned');
  }

  await bookService.updateBook(lending.bookId, { available: true });

  const { data: updateLending, error: errorUpdateLanding } = await supabase
    .from('Lendings')
    .update({ returned: true, returnDate: new Date() })
    .eq('id', lendingId)
    .select('*')
    .single();

  if (errorUpdateLanding) throw errorUpdateLanding;

  return updateLending;
};

// Function to get all borrowed books for a user
const getUserBorrowedBooks = async (userId, token) => {
  const filter = {
    returned: false,
  };

  if (userId) {
    filter.userId = userId;
  }

  const { data, error } = await supabase
    .from('Lendings')
    .select('*, Books(*)')
    .match(filter);

  if (error) throw error;

  const borrowedBooksWithUserDetails = await Promise.all(
    data.map(async (lending) => {
      const { data: user } = await supabase
        .from("profiles")
        .select('*')
        .eq('user_id', lending.userId)
        .single();

      return {
        ...lending,
        User: user
      }
    })
  );

  return borrowedBooksWithUserDetails;
};

export default { borrowBook, returnBook, getUserBorrowedBooks }