import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book-service.component';
import { Book } from '../../models/book.model';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from '../about/about.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { UploadPdfComponent } from '../upload-pdf/upload-pdf.component';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    UploadPdfComponent,
    InfoModalComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  books: Book[] = [];
  showModal = false;
  selectedBookId: number | null = null; // Propriedade para armazenar o ID do livro selecionado

  constructor(private bookService: BookService, private router: Router) {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }
  openModal(book: Book) {
    this.selectedBookId = Number(book.id); // Converte para `number`
    console.log('ID do livro selecionado:', this.selectedBookId);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBookId = null; // Limpa o ID ao fechar o modal
  }

  loadAllBooks() {
    this.bookService.getAllBooks().subscribe((data) => {
      console.log('Livros carregados:', data);
      this.books = data;
    });
  }
  filterBooks(genero: string) {
    this.bookService.getBooksByGenero(genero).subscribe((data) => {
      console.log('Livros filtrados:', data);
      this.books = data;
    });
  }

  searchBooks(query: string) {
    this.bookService.searchBooks(query).subscribe((data) => {
      this.books = data;
    });
  }

  getImageUrl(imageData: { imageData: string; type: string }): string {
    return `data:${imageData.type};base64,${imageData.imageData}`;
  }

  isLastGenero(generos: string[], genero: string): boolean {
    return generos.indexOf(genero) === generos.length - 1;
  }
}
