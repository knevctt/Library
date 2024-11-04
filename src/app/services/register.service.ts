import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient) { }

  private apiUrl= "http://localhost:8080/api/user"

  EnviaCadastro(user: User): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/save`, user, { responseType: 'text' });
  }
}

