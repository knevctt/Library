import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private registerService: RegisterService){}

  user: User[] = [];
     
  novoUser: User = {

    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: ""

  }
  salvarCliente(): void{

    this.registerService.EnviaCadastro(this.novoUser).subscribe((data)=>{
      this.user.push(data);
      console.log(data);

      this.novoUser = {
        name: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
      }
    })
  }
  
}
