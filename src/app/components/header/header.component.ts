import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/LoginService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() generoSelected = new EventEmitter<string>();
  @Output() searchQueryChanged = new EventEmitter<string>();
  searchQuery: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  generos = [
    'FICCAO',
    'AVENTURA',
    'DRAMA',
    'ROMANCE',
    'FANTASIA',
    'TERROR',
    'BIOGRAFIA',
    'TECNOLOGIA',
    'HISTORIA',
    'MISTERIO'
  ];

  showGenreList = false;

  searchBooks() {
    this.searchQueryChanged.emit(this.searchQuery);
  }

  toggleGenreList() {
    this.showGenreList = !this.showGenreList;
  }

  isContactCardVisible = false;

  showContactCard() {
    this.isContactCardVisible = true;
  }

  hideContactCard() {
    this.isContactCardVisible = false;
  }

  filterByGenero(genero: string) {
    this.generoSelected.emit(genero);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
 }
}
