# Book Management REST API

REST API for managing books with Node.js, Express, and TypeScript.

## Installation

```bash
npm install
```

Create `.env` file:
```
PORT=3000
NODE_ENV=development
```

## Run

```bash
npm run dev    # Development
npm test       # Tests
npm run build  # Build
npm start      # Production
```

## API Endpoints

**Base URL:** `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /books | Get all books |
| GET | /books/:id | Get book by ID |
| POST | /books | Create book |
| PUT | /books/:id | Update book |
| DELETE | /books/:id | Delete book |
| POST | /books/import | Import CSV |

## Request Examples

**Create Book:**
```json
POST /api/books
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925
}
```

**CSV Import:**
```
POST /api/books/import
Content-Type: multipart/form-data
file: books.csv
```

CSV Format:
```csv
title,author,publishedYear
Book Title,Author Name,2024
```
