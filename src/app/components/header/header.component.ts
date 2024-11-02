import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showGenreList = false;

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
}
