import express from 'express';
import { inMemoryStore } from '../config/store.js';
import { getMongoStatus } from '../config/db.js';
import Department from '../models/Department.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const departments = await Department.find().sort({ createdAt: -1 });
      return res.json(departments);
    }
    return res.json(inMemoryStore.departments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load departments.' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: 'Department name and code are required.' });
  }

  try {
    if (getMongoStatus()) {
      const department = await Department.create({ name, code });
      return res.status(201).json(department);
    }

    const item = {
      _id: `dept-${Date.now()}`,
      name,
      code,
      createdAt: new Date().toISOString(),
    };

    inMemoryStore.departments.push(item);
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create department.' });
  }
});

export default router;
