import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
