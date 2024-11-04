import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-pdf',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss']
})
export class UploadPdfComponent {
  book = {
    title: '',
    author: '',
    synopsis: ''
  };
  selectedImage: File | null = null;
  selectedPdf: File | null = null;

  constructor(private http: HttpClient) {}

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

    this.http.post('http://localhost:8080/api/book/upload', formData)
      .subscribe(response => {
        console.log('Upload successful', response);
      }, error => {
        console.error('Upload error', error);
      });
  }
}
