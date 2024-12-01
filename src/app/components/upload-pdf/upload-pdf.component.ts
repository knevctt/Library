import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book-service.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/LoginService';
import { LoginComponent } from '../login/login.component';
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-upload-pdf',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss'],
})
export class UploadPdfComponent {
  book = {
    title: '',
    author: '',
    synopsis: '',
    generos: [] as string[],
  };
  selectedImage: File | null = null;
  selectedPdf: File | null = null;

  constructor(
    private http: HttpClient,
    private bookService: BookService,
    private loginService: LoginService
  ) {}

  generosDisponiveis = [
    'FICCAO',
    'AVENTURA',
    'DRAMA',
    'ROMANCE',
    'FANTASIA',
    'TERROR',
    'BIOGRAFIA',
    'TECNOLOGIA',
    'HISTORIA',
    'MISTERIO',
  ];

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPdf = input.files[0];
    }
  }

  uploadBook(): void {
    const headers = this.getAuthHeaders();
    if (!headers.get('Authorization')) {
      Swal.fire({
        title: "Você precisa estar logado para realizar o upload de um livro",
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
      return;
    }

    if (!this.selectedImage || !this.selectedPdf) {
      Swal.fire({
        title: "Por favor, selecione uma imagem e um PDF",
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
      return;
    }

    const formData = new FormData();
    formData.append('title', this.book.title);
    formData.append('author', this.book.author);
    formData.append('synopsis', this.book.synopsis);
    formData.append('image', this.selectedImage);
    formData.append('pdf', this.selectedPdf);
    formData.append('generos', JSON.stringify(this.book.generos));

    this.bookService.uploadBook(formData, { headers }).subscribe(
      (response) => {
        alert('Upload bem-sucedido! O livro foi adicionado com sucesso. 📚');
      },
      (error) => {
        alert('Erro no upload. Tente novamente.');
      }
    );
  }

  private getAuthHeaders(): HttpHeaders {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');  // Recupera o token usando a chave correta
      console.log('Token recuperado do localStorage:', token);  // Verifique o token recuperado
      if (token) {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      } else {
        console.error('Token JWT não encontrado no localStorage');
        return new HttpHeaders();
      }
    } else {
      console.error('localStorage não está disponível no ambiente atual');
      return new HttpHeaders();
    }
  }

  addGenero(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const genero = selectElement.value;
    if (genero && !this.book.generos.includes(genero)) {
      this.book.generos.push(genero);
    }
    selectElement.value = ''; // Resetar o valor do seletor
  }

  removeGenero(genero: string): void {
    this.book.generos = this.book.generos.filter((g) => g !== genero);
  }
}
