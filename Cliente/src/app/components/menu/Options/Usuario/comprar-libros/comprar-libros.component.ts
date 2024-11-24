import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../../Services/books.services';
declare var bootstrap: any;

@Component({
  selector: 'app-comprar-libros',
  templateUrl: './comprar-libros.component.html',
  styleUrls: ['./comprar-libros.component.css']
})
export class ComprarLibrosComponent implements OnInit {
  books: any[] = [];
  searchTerm: string = '';
  selectedBook: any = null;  // Para almacenar el libro seleccionado

  constructor(private booksService: BooksService) { }

  ngOnInit(): void { }

  // Método para buscar libros
  searchBooks(): void {
    if (this.searchTerm) {
      this.booksService.getBooks(this.searchTerm).subscribe(
        (data) => {
          this.books = data;
        },
        (error) => {
          console.error('Error al obtener los libros:', error);
        }
      );
    }
  }

  // Método para abrir el modal con los detalles del libro
  openModal(book: any): void {
    this.selectedBook = book;
    const modalElement = document.getElementById('bookModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
