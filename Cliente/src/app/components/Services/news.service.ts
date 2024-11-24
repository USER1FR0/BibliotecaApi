import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey: string = '6e9ca18ef58c497e8ece57cca0a46bcc';
  private apiUrl: string = 'https://newsapi.org/v2/top-headlines';
  

  constructor(private http: HttpClient) {}

  // Método para obtener noticias
  getTopHeadlines(country: string = 'us'): Observable<any> {
    const url = `${this.apiUrl}?country=${country}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}

