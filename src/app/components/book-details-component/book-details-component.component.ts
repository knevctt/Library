import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../book-service/book-service.component';
import { Book } from '../book.model';
import { saveAs } from 'file-saver';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-details-component',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './book-details-component.component.html',
  styleUrls: ['./book-details-component.component.scss']
})
export class BookDetailsComponentComponent {
  book: Book = {
    id: '',
    title: '',
    author: '',
    synopsis: '',
    imageData: ''
  };
  books: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
    this.getBookDetails();
  }

  getBookDetails() {
    const bookId = this.route.snapshot.params['id'];
    this.bookService.getBookById(bookId).subscribe((book) => {
      this.book = book;
    });
  }

  downloadBook() {
    this.bookService.downloadBook(this.book.id).subscribe((blob) => {
      saveAs(blob, this.book.title + '.pdf');
    });
  }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.bookService.getAllImages().subscribe(books => {
      this.books = books.map(book => ({
        ...book,
        coverImage: this.createImageFromBlob(book.imageData) // Converte Base64 para URL
      }));
    }, error => {
      console.error('Erro ao carregar livros:', error);
    });
  }

  createImageFromBlob(imageData: string): string {
    // Monta o link completo para o Base64
    return `data:${this.book.imageData};base64,${imageData}`;
  }
}
