import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/loginAuth';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        } else {
          console.error('Resposta do servidor não contém token.');
        }
      })
    );
  }

  logar(login: Login): Observable<string> {
    const payload = login; // Gera o payload do model
    return this.http.post<string>(this.apiUrl, payload, { responseType: 'text' as 'json' });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Token recuperado do localStorage:', token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return '';
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as User;
    if (user.role == role) return true;
    else return false;
  }
}

