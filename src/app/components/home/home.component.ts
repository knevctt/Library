import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../book-service/book-service.component';
import { Book } from '../book.model';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from '../about/about.component';
import { PrivacyPolicyComponent } from "../privacy-policy/privacy-policy.component";
import { TermsOfServiceComponent } from "../terms-of-service/terms-of-service.component";
import { UploadPdfComponent } from "../upload-pdf/upload-pdf.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule, RouterModule, AboutComponent, PrivacyPolicyComponent, TermsOfServiceComponent, UploadPdfComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  viewBookDetails(book: Book) {
    this.router.navigate(['/book-details', book.id]);
  }
}

