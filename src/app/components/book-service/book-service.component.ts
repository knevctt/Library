import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book.model';
import { title } from 'process';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.scss'],
})
export class BookServiceComponent {}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/book/findAll';
  private ById = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.ById}/findById/${id}`);
  }

  downloadBook(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}`, {
      responseType: 'blob',
    });
  }
  uploadBook(bookData: FormData): Observable<any> {
    return this.http.post(`${this.ById}/upload`, bookData);
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  getBooksByGenero(genero: string): Observable<any> {
    return this.http.get(`${this.ById}/genre`, { params: { genero } });
  }

  searchBooks(query: string): Observable<any> {
    return this.http.get(`${this.ById}/search`, { params: { query } });
  }
}
