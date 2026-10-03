# College Practical Management Portal

A complete academic practical management website for Tulsiramji Gaikwad-Patil College of Engineering and Technology, Department of Artificial Intelligence & Machine Learning.

## Features

- Public practical library with 10 seeded practicals
- Admin authentication with hashed passwords
- Protected admin routes
- CRUD operations for practicals
- Subject and department management
- PDF upload and preview
- Search, filtering, and pagination support
- Responsive academic interface
- MongoDB-ready models with in-memory fallback for local development

## Stack

- Frontend: Next.js + React + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: JWT with secure cookie

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Start MongoDB locally or use a connection string in `.env`.
4. Start the app:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Admin login

Use the seeded admin account from `.env`:

- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

## Production deployment

- Set `MONGODB_URI`, `JWT_SECRET`, and `ADMIN_*` values in your environment.
- Deploy the backend and frontend separately or behind a reverse proxy.
- Ensure uploads and PDF files are persisted appropriately.

### Vercel frontend deployment

Create or update the Vercel project with these settings:

- Repository: `krushnarajpure/college-practical-portal`
- Root Directory: `frontend`
- Install Command: `npm install`
- Build Command: `npm run build`

Do not use `npm install --prefix=..`; that command makes Vercel look for a package file outside the cloned project. Set `NEXT_PUBLIC_API_URL` to the deployed backend URL before publishing the frontend.

## Default seeded practicals

1. Selection Sort and Insertion Sort
2. Linear Search and Binary Search
3. Stack Using Array
4. Infix, Postfix and Prefix Expression
5. Linear Queue and Circular Queue
6. Singly Linked List
7. Doubly Linked List and Circular Linked List
8. Binary Tree Traversals
9. BFS, DFS and Hashing
10. Library Management System

## Notes

The project includes a practical data seed and a fallback store so it can run without a live MongoDB connection during local setup.
