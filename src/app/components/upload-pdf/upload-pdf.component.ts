import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-upload-pdf',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './upload-pdf.component.html',
  styleUrl: './upload-pdf.component.scss'
})
export class UploadPdfComponent {
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const fileName = input.files[0].name;
        const fileNameElement = document.getElementById('file-name') as HTMLElement;
        fileNameElement.innerText = fileName; // Atualiza o texto com o nome do arquivo
    }
}

}
