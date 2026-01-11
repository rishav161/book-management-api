export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

export interface ValidationError {
  row: number;
  errors: string[];
}

export interface ImportResult {
  added: number;
  errors: ValidationError[];
}
