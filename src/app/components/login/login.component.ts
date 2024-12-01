import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../services/LoginService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: User = new User();
  errorMessage: string = '';

  loginService = inject(LoginService);
  router = inject(Router);

  constructor() {}

  login() {
    this.loginService.login(this.user).subscribe(
    (response) => {
      console.log('Login bem-sucedido', response);
      localStorage.setItem('token', response.token); // Armazene o token no localStorage
      console.log('Token armazenado no localStorage:', localStorage.getItem('token'));
      this.router.navigate(['/home']); // Redirecionar para a página inicial após login bem-sucedido
    },
    (error) => {
      console.error('Erro no login', error);
      this.errorMessage =
        'Credenciais inválidas. Por favor, tente novamente.';
    }

    );
  }
}
