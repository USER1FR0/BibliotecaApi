const axios = require('axios');

// Tu API Key de Google Books
const GOOGLE_BOOKS_API_KEY = 'AIzaSyCvXNE7HfsJaDAW7iag4V9T0LIMYAcbN6A';

// Función para obtener libros
const getBooks = async (searchTerm) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${GOOGLE_BOOKS_API_KEY}`;
  
  try {
    const response = await axios.get(url);
    return response.data.items;  // Retorna los libros encontrados
  } catch (error) {
    console.error('Error al obtener libros:', error);
    throw error;
  }
};

module.exports = { getBooks };
