import { Request, Response, NextFunction } from 'express';
import bookService from '../services/bookService';

export const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = bookService.getBookById(req.params.id as string);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = bookService.validateBook(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const book = bookService.createBook({
      title: req.body.title,
      author: req.body.author,
      publishedYear: Number(req.body.publishedYear)
    });
    
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = bookService.validateBook(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const book = bookService.updateBook(req.params.id as string, {
      title: req.body.title,
      author: req.body.author,
      publishedYear: Number(req.body.publishedYear)
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = bookService.deleteBook(req.params.id as string);
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const importBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'CSV file is required' });
    }

    const csvContent = req.file.buffer.toString('utf-8');
    const result = bookService.parseCSV(csvContent);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
