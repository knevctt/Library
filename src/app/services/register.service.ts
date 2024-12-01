import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient) { }

  private apiUrl= "http://localhost:8080/novo-usuario/save"

  EnviaCadastro(user: User): Observable<any> {
    
    return this.http.post(`${this.apiUrl}`, user, { responseType: 'text' });
  }
}

