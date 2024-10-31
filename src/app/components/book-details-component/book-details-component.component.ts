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
  styleUrl: './book-details-component.component.scss'
})
export class BookDetailsComponentComponent {
  book: Book = {
    id: '',
    title: '',
    author: '',
    synopsis: '',
    coverImage: ''
  };

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
}
