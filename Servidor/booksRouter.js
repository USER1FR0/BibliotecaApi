const express = require('express');
const booksService = require('./books.service');  // El servicio que maneja las llamadas a Google Books API

const router = express.Router();  // Crea el router

// Ruta para buscar libros en Google Books
router.get('/books', async (req, res) => {
  const searchTerm = req.query.q;  // Obtén el término de búsqueda de los parámetros de la consulta

  try {
    const books = await booksService.getBooks(searchTerm);  // Llama al servicio para obtener los libros
    res.json(books);  // Envía los libros como respuesta
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).send('Error al obtener libros');
  }
});

module.exports = router;  // Exporta el router
