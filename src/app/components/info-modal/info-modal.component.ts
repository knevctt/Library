// info-modal.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book-service.component';
import { Book } from '../../models/book.model';
import { LoginService } from '../../services/LoginService';

@Component({
  standalone: true,
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  imports: [CommonModule, HttpClientModule],
})
export class InfoModalComponent {
  @Input() isVisible: boolean = false;
  @Input() selectedBookId: number | null = null; // Propriedade para armazenar o ID do livro selecionado
  book: Book | undefined; // Propriedade para armazenar os detalhes do livro
  isLoggedIn: boolean = false; // Variável para verificar se o usuário está logado

  constructor(
    private bookService: BookService,
    private router: Router,
    private loginService: LoginService,
    private http: HttpClient
  ) {}

  closeModal() {
    this.isVisible = false;
    this.book = undefined; // Limpar o livro ao fechar o modal
  }

  ngOnChanges() {
    if (this.selectedBookId !== null) {
      console.log('ID recebido em InfoModalComponent:', this.selectedBookId);
      this.getBookDetails(this.selectedBookId);
    }
  }

  ngOnInit() {
    // Verificação de login
    this.isLoggedIn = this.checkLoginStatus();
    if (this.selectedBookId !== null) {
      console.log(
        'ID recebido em InfoModalComponent via OnInit:',
        this.selectedBookId
      );
      this.getBookDetails(this.selectedBookId);
    }
  }

  getBookDetails(id: number) {
    this.bookService.getBookById(id).subscribe((book) => {
      this.book = book;

      // Processar imagem
      if (this.book.imageData && this.book.imageData.imageData) {
        this.book.imageUrl = `data:${this.book.imageData.type};base64,${this.book.imageData.imageData}`;
      }

      // Processar PDF
      if (this.book.pdfData && this.book.pdfData.pdfData) {
        this.book.pdfUrl = `data:${this.book.pdfData.type};base64,${this.book.pdfData.pdfData}`;
      }
    });
  }

  downloadPdf() {
    if (this.isLoggedIn && this.selectedBookId !== null) {
      this.http
        .get(
          `http://localhost:8080/api/book/downloadPdf/${this.selectedBookId}`,
          { responseType: 'blob' }
        )
        .subscribe(
          (response: Blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(response);
            link.download = `${this.book?.title}.pdf`;
            document.body.appendChild(link); // Adicionar o link ao DOM
            link.click();
            document.body.removeChild(link); // Remover o link do DOM
          },
          (error) => {
            console.error('Erro ao baixar o PDF', error);
            alert('Erro ao baixar o PDF.');
          }
        );
    } else {
      alert('Você precisa estar logado para baixar o PDF.');
    }
  }

  checkLoginStatus(): boolean {
    return this.loginService.isLoggedIn();
  }
}
