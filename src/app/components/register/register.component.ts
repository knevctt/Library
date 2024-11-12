import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import 'animate.css';

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

      Swal.fire({
        title: "Cadastrado com sucesso",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      
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