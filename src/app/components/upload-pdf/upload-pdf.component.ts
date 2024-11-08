import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book-service.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/LoginService';

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
    generos: [] as string[]
  };
  selectedImage: File | null = null;
  selectedPdf: File | null = null;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private bookService: BookService, private loginService: LoginService) {}

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

  ngOnInit() {
    this.isLoggedIn = this.checkLoginStatus();
   }
   
  checkLoginStatus(): boolean {
    return this.loginService.isLoggedIn();
  }

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
    if (!this.isLoggedIn) {
      alert('Você precisa estar logado para fazer o upload de um livro.');
      return;
    }

    if (!this.selectedImage || !this.selectedPdf) {
      alert('Por favor, selecione uma imagem e um PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.book.title);
    formData.append('author', this.book.author);
    formData.append('synopsis', this.book.synopsis);
    formData.append('image', this.selectedImage);
    formData.append('pdf', this.selectedPdf);
    formData.append('generos', JSON.stringify(this.book.generos));

    this.bookService.uploadBook(formData).subscribe(
      (response) => {
        alert('Upload bem-sucedido! O livro foi adicionado com sucesso. 📚');
      },
      (error) => {
        alert('Erro no upload. Tente novamente.');
      }
    );
  }

  addGenero(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const genero = selectElement.value;
    if (genero && !this.book.generos.includes(genero)) {
       this.book.generos.push(genero);
       }
    selectElement.value = ''; // Resetar o valor do seletor }
  }
  
    removeGenero(genero: string): void {
    this.book.generos = this.book.generos.filter((g) => g !== genero);
  }
}
