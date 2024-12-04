import { Component, OnInit } from '@angular/core';
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
import { LoginService } from '../../services/LoginService';

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
    InfoModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  showModal = false;
  selectedBookId: number | null = null; // Propriedade para armazenar o ID do livro selecionado
  page: number = 0;
  size: number = 10; // Exibir tantos livros por página
  totalPages: number = 0;

  constructor(private bookService: BookService, private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks(this.page, this.size).subscribe((data) => {
      this.books = data.content;
      this.totalPages = data.totalPages;
    });
  }

  openModal(book: Book) {
    if (this.showModal && this.selectedBookId === book.id) {
      // Se o modal já estiver aberto para o mesmo livro, fecha
      this.closeModal();
    } else {
      // Caso contrário, abre o modal com o livro selecionado
      this.selectedBookId = Number(book.id);
      this.showModal = true;
    }
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

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getBooks();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getBooks();
    }
  }

  goToPage(page: number): void {
    this.page = page;
    this.getBooks();
  }

  getPaginationArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }
}
