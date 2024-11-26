import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { Login } from '../auth/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  addToken(token: any) {
    throw new Error('Method not implemented.');
  }
  logar(login: Login) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/user/login';
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      tap((response) => {
        this.loggedIn = true;
      })
    );
  }
  isLoggedIn(): boolean {
     return this.loggedIn;
    
    }
}
