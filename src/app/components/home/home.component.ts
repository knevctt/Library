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
  books = [
    {
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J. K. Rowling',
      coverImage: 'https://i0.wp.com/animagos.com.br/wp-content/uploads/2017/07/livro-01_capa.jpg?ssl=1'
    },
    {
      title: 'Harry Potter e a Câmara Secreta',
      author: 'J. K. Rowling',
      coverImage: 'https://m.media-amazon.com/images/I/81jbivNEVML._SL1500_.jpg'
    },
    {
      title: 'Harry Potter e o Cálice de Fogo',
      author: 'J. K. Rowling',
      coverImage: 'https://i0.wp.com/animagos.com.br/wp-content/uploads/2017/07/livro-04_capa.jpg?ssl=1'
    },
    {
      title: 'Harry Potter e a Ordem da Fênix',
      author: 'J. K. Rowling',
      coverImage: 'https://i0.wp.com/animagos.com.br/wp-content/uploads/2017/07/livro-05_capa.jpg?ssl=1'
    },
    {
      title: 'Harry Potter e o Enigma do Principe',
      author: 'J. K. Rowling',
      coverImage: 'https://i0.wp.com/animagos.com.br/wp-content/uploads/2017/07/livro-06_capa.jpg?ssl=1'
    },
    {
      title: 'Harry Potter e as Reliquias da Morte',
      author: 'J. K. Rowling',
      coverImage: 'https://i0.wp.com/animagos.com.br/wp-content/uploads/2017/07/livro-07_capa.jpg?ssl=1'
    }
    
  ];
}

