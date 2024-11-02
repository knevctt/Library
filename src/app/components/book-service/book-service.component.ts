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
  private downloadUrl = 'http://localhost:8080/pdf';
  private downloadImage = 'http://localhost:8080/image/findAll';
  private ById = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.ById}/findById/${id}`);
  }

  downloadBook(id: string): Observable<Blob> {
    return this.http.get(`${this.downloadUrl}/download/${id}`, {
      responseType: 'blob',
    });
  }

  getAllImages(): Observable<Book[]> {
    return this.http.get<Book[]>(this.downloadImage);
}
}
