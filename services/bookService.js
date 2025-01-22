import supabase from '../supabase.js';

// Create a new book
const createBook = async (title, author) => {
  const { data, error } = await supabase
    .from('Books')
    .insert({ title, author })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Get all books with filter
const getBooksWithFilter = async (title, author) => {
  let query = supabase.from('Books').select('*');

  // Apply optional filters
  if (title) {
    query = query.ilike('title', `%${title}%`);
  }

  if (author) {
    query = query.ilike('author', `%${author}%`);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return data;
};

// Get a book by its ID
const getBookById = async (bookId) => {
  const { data, error } = await supabase
    .from('Books')
    .select('*')
    .eq('id', bookId)
    .single();

  if (error) {
    throw new Error('Book not found');
  }

  return data;
};

// Update a book by its ID
const updateBook = async (bookId, request) => {
  await getBookById(bookId);

  const { title, author, available } = request;

  let updatedData = { 
    ...(typeof title !== 'undefined' ? { title } : {}),
    ...(typeof author !== 'undefined' ? { author } : {}),
    ...(typeof available === 'boolean' ? { available } : {})
  };

  const { data, error } = await supabase
    .from('Books')
    .update(updatedData)
    .eq('id', bookId)
    .select('*')
    .single();

  if (error) throw error;

  return data;
};

// Delete a book by its ID
const deleteBook = async (bookId) => {
  await getBookById(bookId);

  const { data, error } = await supabase
    .from('Books')
    .delete()
    .eq('id', bookId);

  if (error) throw error;

  return data;
};

export default {
  createBook,
  getBooksWithFilter,
  getBookById,
  updateBook,
  deleteBook,
};