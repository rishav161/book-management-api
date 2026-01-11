import { randomUUID } from 'crypto';
import { Book, ValidationError, ImportResult } from '../types';

class BookService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  createBook(bookData: Omit<Book, 'id'>): Book {
    const book: Book = {
      id: randomUUID(),
      ...bookData
    };
    this.books.push(book);
    return book;
  }

  updateBook(id: string, bookData: Partial<Omit<Book, 'id'>>): Book | null {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return null;
    
    this.books[index] = { ...this.books[index], ...bookData };
    return this.books[index];
  }

  deleteBook(id: string): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return false;
    
    this.books.splice(index, 1);
    return true;
  }

  validateBook(data: any): string[] {
    const errors: string[] = [];
    
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
      errors.push('Title is required and must be a non-empty string');
    }
    
    if (!data.author || typeof data.author !== 'string' || data.author.trim() === '') {
      errors.push('Author is required and must be a non-empty string');
    }
    
    if (!data.publishedYear) {
      errors.push('Published year is required');
    } else {
      const year = Number(data.publishedYear);
      if (isNaN(year) || !Number.isInteger(year) || year < 1000 || year > new Date().getFullYear()) {
        errors.push('Published year must be a valid year');
      }
    }
    
    return errors;
  }

  parseCSV(csvContent: string): ImportResult {
    const lines = csvContent.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length === 0) {
      return { added: 0, errors: [{ row: 0, errors: ['CSV file is empty'] }] };
    }

    const header = lines[0].split(',').map(h => h.trim());
    const requiredHeaders = ['title', 'author', 'publishedYear'];
    
    const missingHeaders = requiredHeaders.filter(h => !header.includes(h));
    if (missingHeaders.length > 0) {
      return { 
        added: 0, 
        errors: [{ row: 0, errors: [`Missing required headers: ${missingHeaders.join(', ')}`] }] 
      };
    }

    const titleIndex = header.indexOf('title');
    const authorIndex = header.indexOf('author');
    const yearIndex = header.indexOf('publishedYear');

    let added = 0;
    const errors: ValidationError[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      const bookData = {
        title: values[titleIndex],
        author: values[authorIndex],
        publishedYear: values[yearIndex]
      };

      const validationErrors = this.validateBook(bookData);
      
      if (validationErrors.length > 0) {
        errors.push({ row: i + 1, errors: validationErrors });
      } else {
        this.createBook({
          title: bookData.title,
          author: bookData.author,
          publishedYear: Number(bookData.publishedYear)
        });
        added++;
      }
    }

    return { added, errors };
  }
}

export default new BookService();
