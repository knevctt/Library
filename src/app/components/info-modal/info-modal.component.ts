// info-modal.component.ts
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book-service/book-service.component';
import { Book } from '../book.model';

@Component({
  standalone: true,
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  imports: [CommonModule, HttpClientModule]
})
export class InfoModalComponent {
  @Input() isVisible: boolean = false;
  @Input() selectedBookId: number | null = null; // Propriedade para armazenar o ID do livro selecionado
  book: Book | undefined; // Propriedade para armazenar os detalhes do livro

  constructor(private bookService: BookService, private router: Router) {}

  closeModal() {
    this.isVisible = false;
    this.book = undefined; // Limpar o livro ao fechar o modal
  }

  ngOnChanges() {
    if (this.selectedBookId) {
        this.getBookDetails(`${this.selectedBookId}`);
    }
}

  getBookDetails(id: string) {
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
    });
  }
}
