import express from 'express';
import { inMemoryStore } from '../config/store.js';
import { getMongoStatus } from '../config/db.js';
import Subject from '../models/Subject.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const subjects = await Subject.find().sort({ createdAt: -1 });
      return res.json(subjects);
    }
    return res.json(inMemoryStore.subjects);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load subjects.' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { name, code, departmentId, semester, academicYear } = req.body;

  if (!name || !code || !departmentId || !semester || !academicYear) {
    return res.status(400).json({ message: 'All subject fields are required.' });
  }

  try {
    if (getMongoStatus()) {
      const subject = await Subject.create({ name, code, departmentId, semester, academicYear });
      return res.status(201).json(subject);
    }

    const item = {
      _id: `subject-${Date.now()}`,
      name,
      code,
      departmentId,
      semester,
      academicYear,
      createdAt: new Date().toISOString(),
    };

    inMemoryStore.subjects.push(item);
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create subject.' });
  }
});

export default router;
