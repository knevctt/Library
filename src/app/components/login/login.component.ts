import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../auth/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: Login = new Login(); // Garantindo que o login seja tipado corretamente

  // Injeção das dependências
  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {}

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: (token: any) => {
        if (token) { // O usuário e senha digitados estavam corretos
          this.loginService.addToken(token);
        } else { // Ou o usuário ou a senha estão incorretos
          alert('usuário ou senha incorretos');
        }
      },
      error: () => {
        alert('deu erro');
      }
    });
  }
  
}
