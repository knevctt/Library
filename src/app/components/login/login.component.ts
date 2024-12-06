import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../services/LoginService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login(); // Instância do model
  errorMessage: string = '';

  loginService = inject(LoginService);
  router = inject(Router);

  constructor() {}

  onLogin() {
    this.loginService.logar(this.login).subscribe(
      (response) => {
        this.loginService.addToken(response); // Salva o token no localStorage
        this.router.navigate(['/home']); // Redireciona após login bem-sucedido
      },
      (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
      }
    );
  }
}
