import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book-service.component';
import { Book } from '../../models/book.model';
import { LoginService } from '../../services/LoginService';
import Swal from 'sweetalert2';
import 'animate.css';

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

  openModal() {
    this.isVisible = true;
  }

  ngOnChanges() {
    if (this.selectedBookId !== null) {
      console.log('ID recebido em InfoModalComponent:', this.selectedBookId);
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

  private getAuthHeaders(): HttpHeaders {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token'); // Recupera o token usando a chave correta
      console.log('Token recuperado do localStorage:', token); // Verifique o token recuperado
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

  downloadPdf() {
    if (this.selectedBookId !== null) {
      const headers = this.getAuthHeaders();
      this.http
        .get(
          `http://localhost:8080/api/book/downloadPdf/${this.selectedBookId}`,
          { responseType: 'blob', headers }
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
      Swal.fire({
        title: 'Você precisa estar logado para baixar o PDF',
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      });
    }
  }
}
