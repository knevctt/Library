import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    console.log('Gênero selecionado:');
    this.generoSelected.emit(genero);
  }
}
