import request from 'supertest';
import app from '../src/app';

describe('Book API', () => {
  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'Test Book',
        author: 'Test Author',
        publishedYear: 2024
      };

      const response = await request(app)
        .post('/api/books')
        .send(newBook)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newBook.title);
      expect(response.body.author).toBe(newBook.author);
      expect(response.body.publishedYear).toBe(newBook.publishedYear);
    });

    it('should return 400 for invalid book data', async () => {
      const invalidBook = {
        title: '',
        author: 'Test Author',
        publishedYear: 2024
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidBook)
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/books', () => {
    it('should return all books', async () => {
      const response = await request(app)
        .get('/api/books')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
