import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-initial-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './initial-page.component.html',
  styleUrl: './initial-page.component.scss'
})
export class InitialPageComponent {

}
