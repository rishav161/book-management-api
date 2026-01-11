# Book Management REST API

A REST API for managing books built with Node.js, Express, and TypeScript. Supports CRUD operations and bulk CSV import with validation.

## Features

- Full CRUD operations for books
- CSV bulk import with row-level validation
- TypeScript for type safety
- Request logging with Morgan
- Centralized error handling
- Unit tests with Jest

## Tech Stack

Node.js, Express, TypeScript, Morgan, Multer, Jest

## Installation

```bash
npm install
```

Create `.env` file:
```env
PORT=3000
NODE_ENV=development
```

## Running

```bash
npm run dev    # Development with auto-reload
npm test       # Run tests
npm run build  # Build for production
npm start      # Start production server
```

## API Endpoints

**Base URL:** `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /books | Get all books |
| GET | /books/:id | Get book by ID |
| POST | /books | Create a new book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |
| POST | /books/import | Import books from CSV |

## Request Examples

### Create Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925
}
```

### CSV Import
```http
POST /api/books/import
Content-Type: multipart/form-data

file: books.csv
```

**CSV Format:**
```csv
title,author,publishedYear
The Great Gatsby,F. Scott Fitzgerald,1925
1984,George Orwell,1949
```

**Response:**
```json
{
  "added": 2,
  "errors": []
}
```

## Validation Rules

- **title**: Required, non-empty string
- **author**: Required, non-empty string
- **publishedYear**: Required, valid year (1000 - current year)

## Testing

Import `postman_collection.json` into Postman to test all endpoints.
