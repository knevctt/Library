import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  books: any[] = [
    {
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J. K. Rowling',
      coverImage: '../../../assets/images/1.png'
    },
    {
      title: 'Harry Potter e a Câmara Secreta',
      author: 'J. K. Rowling',
      coverImage: 'assets/images/2.png'
    },
    {
      title: 'Harry Potter e o Cálice de Fogo',
      author: 'J. K. Rowling',
      coverImage: 'assets/images/book3.jpg'
    },
    {
      title: 'Harry Potter e a Ordem da Fênix',
      author: 'J. K. Rowling',
      coverImage: 'assets/images/book4.jpg'
    }
    
  ];
}