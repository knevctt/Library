import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn(): boolean {
    throw new Error('Method not implemented.');
  }

  http = inject(HttpClient);
  API = "http://localhost:8080/api/login";

  constructor() {}

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, { responseType: 'text' as 'json' });
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
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role == role)
      return true;
    else
      return false;
  }

  findByUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.API+"/findByUsername/"+username );
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.API+"/findById/"+id );
  }
}
