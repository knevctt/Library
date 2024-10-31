import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {path: 'about', component: AboutComponent}
]

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AboutComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
