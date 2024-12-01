import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/loginAuth';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      tap((response) => {
        console.log('Resposta do servidor: ', response);
        if(response && response.token){
          localStorage.setItem('token', response.token);
          console.log('Token armazenado no localStorage:', localStorage.getItem('token')); // Verifica o token armazenado
        }else{
          console.error('Resposta do servidor não contém token.');
        }
      })
    );
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Token recuperado do localStorage:', token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addToken(token: string){
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
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as User;
    if (user.role == role)
      return true;
    else
      return false;
  }
}
