export interface Book {
    id: number;
    title: string;
    author: string;
    synopsis: string;
    genero: string;
    imageDatas: string; // Base64 string
    pdfDatas: string; // Base64 string
    imageData: {
      id: number;
      name: string;
      type: string;
      imageData: string; // Base64 string
    };
    pdfData: {
      id: number;
      name: string;
      type: string;
      pdfData: string; // Base64 string
    };
    imageUrl?: string; // URL gerada a partir dos dados Base64
    pdfUrl?: string; // URL gerada a partir dos dados Base64
  }
  