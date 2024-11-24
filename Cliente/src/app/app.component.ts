import { Component, OnInit } from '@angular/core';
import { NewsService } from './components/Services/news.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Biblioteca';
  isSidebarHidden = true;
  showSearch = false;
  showNewBooks = false;
  showEmailConfirm = false;
  showMultas = false;
  news: any[] = [];
  translatedNews: any[] = [];

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    // Obtener las noticias
    this.newsService.getTopHeadlines().subscribe({
      next: (response) => {
        this.news = response.articles;
      },
      error: (err) => console.error('Error al obtener noticias:', err),
    });
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  showSearchBooks() {
    this.resetViews();
    this.showSearch = true;
  }

  showNewBook() {
    this.resetViews();
    this.showNewBooks = true;
  }

  showEmailConfirmation() {
    this.resetViews();
    this.showEmailConfirm = true;
  }

  showMulta() {
    this.resetViews();
    this.showMultas = true;
  }

  resetViews() {
    this.showSearch = false;
    this.showNewBooks = false;
    this.showEmailConfirm = false;
    this.showMultas = false;
  }
}