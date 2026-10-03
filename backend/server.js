import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDatabase, getMongoStatus } from './src/config/db.js';
import { ensureSeededData } from './src/config/store.js';
import authRoutes from './src/routes/authRoutes.js';
import practicalRoutes from './src/routes/practicalRoutes.js';
import subjectRoutes from './src/routes/subjectRoutes.js';
import departmentRoutes from './src/routes/departmentRoutes.js';
import pdfRoutes from './src/routes/pdfRoutes.js';

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  const databaseMode = getMongoStatus() ? 'mongodb' : 'disabled';

  res.json({
    success: true,
    message: 'Backend is running',
    database: databaseMode,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/practicals', practicalRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/pdfs', pdfRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

let initialization;

export async function initializeServer() {
  if (!initialization) {
    initialization = Promise.all([connectDatabase(), ensureSeededData()]);
  }

  await initialization;
}

export { app };

async function startServer() {
  await initializeServer();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

if (process.env.VERCEL !== '1') {
  startServer();
}
