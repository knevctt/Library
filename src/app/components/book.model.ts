export interface Book {
    id: string;
    title: string;
    author: string;
    synopsis: string;
    imageData: string; // Mantendo como string para base64
    pdfData: string; // Mantendo como string para base64
    imageUrl?: string;
    pdfUrl?: string;
}
