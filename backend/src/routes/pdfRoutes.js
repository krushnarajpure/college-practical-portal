import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { inMemoryStore } from '../config/store.js';
import { getMongoStatus } from '../config/db.js';
import PdfFile from '../models/PdfFile.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const uploadDir = path.resolve(process.cwd(), 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'));
    }
  },
});

router.get('/', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const files = await PdfFile.find().sort({ createdAt: -1 });
      return res.json(files);
    }
    return res.json(inMemoryStore.pdfs);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load PDFs.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const file = await PdfFile.findById(req.params.id);
      if (!file) return res.status(404).json({ message: 'PDF not found.' });
      return res.json(file);
    }

    const file = inMemoryStore.pdfs.find((item) => String(item._id) === String(req.params.id));
    if (!file) return res.status(404).json({ message: 'PDF not found.' });
    return res.json(file);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch PDF details.' });
  }
});

router.get('/:id/download', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const file = await PdfFile.findById(req.params.id);
      if (!file) return res.status(404).json({ message: 'PDF not found.' });
      return res.download(file.path);
    }

    const file = inMemoryStore.pdfs.find((item) => String(item._id) === String(req.params.id));
    if (!file) return res.status(404).json({ message: 'PDF not found.' });

    return res.download(file.path);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to download PDF.' });
  }
});

router.post('/', authenticate, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'PDF file is required.' });
  }

  try {
    const data = {
      _id: `pdf-${Date.now()}`,
      name: req.body.name || req.file.originalname,
      practicalNumber: Number(req.body.practicalNumber || 1),
      subject: req.body.subject || 'Data Structure & Algorithms Lab',
      uploadDate: new Date().toISOString(),
      fileSize: req.file.size,
      status: 'Active',
      path: req.file.path,
    };

    if (getMongoStatus()) {
      const created = await PdfFile.create({
        name: data.name,
        practicalNumber: data.practicalNumber,
        subject: data.subject,
        uploadDate: new Date(),
        fileSize: data.fileSize,
        status: data.status,
        path: data.path,
      });
      return res.status(201).json(created);
    }

    inMemoryStore.pdfs.unshift(data);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'File upload failed.' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (getMongoStatus()) {
      const pdf = await PdfFile.findByIdAndDelete(req.params.id);
      if (!pdf) return res.status(404).json({ message: 'PDF not found.' });
      return res.json({ success: true, message: 'PDF deleted.' });
    }

    const beforeLength = inMemoryStore.pdfs.length;
    inMemoryStore.pdfs = inMemoryStore.pdfs.filter((item) => String(item._id) !== String(req.params.id));
    if (inMemoryStore.pdfs.length === beforeLength) {
      return res.status(404).json({ message: 'PDF not found.' });
    }

    return res.json({ success: true, message: 'PDF deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete PDF.' });
  }
});

export default router;
