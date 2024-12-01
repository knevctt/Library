import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/book/paginated';
  private findAllUrl = 'http://localhost:8080/api/book/findAll';
  private ById = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {}

  getBooks(page: number, size: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, { headers });
  }

  getBookById(id: number): Observable<Book> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book>(`${this.ById}/findById/${id}`, {
      headers: headers,
    });
  }

  downloadBook(id: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.ById}/download/${id}`, {
      headers,
      responseType: 'blob',
    });
  }

  uploadBook(
    bookData: FormData,
    options?: {
      headers: HttpHeaders;
    }
  ): Observable<any> {
    return this.http.post(`${this.ById}/upload`, bookData, options);
  }

  getAllBooks(): Observable<Book[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book[]>(this.findAllUrl, { headers });
  }

  getBooksByGenero(genero: string): Observable<Book[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book[]>(`${this.ById}/genero`, {
      headers: headers,
      params: { genero },
    });
  }

  searchBooks(query: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.ById}/search`, {
      headers: headers,
      params: { query },
    });
  }

  private getAuthHeaders(): HttpHeaders {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token'); // Recupera o token usando a chave correta
      if (token) {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      } else {
        console.error('Token JWT não encontrado no localStorage');
        return new HttpHeaders();
      }
    } else {
      console.error('localStorage não está disponível');
      return new HttpHeaders();
    }
  }
}
