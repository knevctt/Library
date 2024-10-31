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
  styleUrl: './book-service.component.scss'
})
export class BookServiceComponent {

}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/book';
  private downloadUrl = 'http://localhost:8080/pdf';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/findById/${id}`);
  }

  downloadBook(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${title}`, { responseType: 'blob' });
  }
}
