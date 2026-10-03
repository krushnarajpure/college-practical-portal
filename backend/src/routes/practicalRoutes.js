import express from 'express';
import { inMemoryStore, ensureSeededData } from '../config/store.js';
import { getMongoStatus } from '../config/db.js';
import Practical from '../models/Practical.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

function normalizePractical(item) {
  return {
    ...item,
    _id: item._id || item.id || String(item.practicalNumber),
    practicalNumber: Number(item.practicalNumber),
    status: item.status || 'Published',
  };
}

router.get('/', async (req, res) => {
  ensureSeededData();

  try {
    if (getMongoStatus()) {
      const practicals = await Practical.find().sort({ practicalNumber: 1 });
      return res.json(practicals);
    }

    let items = [...inMemoryStore.practicals];
    const search = (req.query.search || '').toString().trim().toLowerCase();
    const filter = (req.query.filter || 'All Practicals').toString();

    if (search) {
      items = items.filter((item) => {
        const searchable = [
          item.practicalNumber,
          item.title,
          item.aim,
          ...(item.topics || []),
          item.algorithm,
          item.theory,
        ]
          .join(' ')
          .toLowerCase();
        return searchable.includes(search);
      });
    }

    if (filter && filter !== 'All Practicals') {
      items = items.filter((item) => {
        const topicList = (item.topics || []).join(' ');
        const text = `${item.title} ${item.aim} ${topicList}`.toLowerCase();
        const map = {
          Sorting: 'selection sort',
          Searching: 'search',
          Stack: 'stack',
          Queue: 'queue',
          'Linked List': 'linked list',
          Tree: 'tree',
          Graph: 'graph',
          Hashing: 'hashing',
          'Mini Project': 'library management',
        };

        return text.includes((map[filter] || filter).toLowerCase());
      });
    }

    return res.json(items.sort((a, b) => a.practicalNumber - b.practicalNumber).map(normalizePractical));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load practicals.' });
  }
});

router.get('/:id', async (req, res) => {
  ensureSeededData();

  try {
    if (getMongoStatus()) {
      const practical = await Practical.findOne({ practicalNumber: Number(req.params.id) });
      if (!practical) {
        return res.status(404).json({ message: 'Practical not found.' });
      }
      return res.json(practical);
    }

    const practical = inMemoryStore.practicals.find((item) => String(item.practicalNumber) === String(req.params.id));
    if (!practical) {
      return res.status(404).json({ message: 'Practical not found.' });
    }
    return res.json(normalizePractical(practical));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load practical details.' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const body = req.body;

  if (!body.practicalNumber || !body.title || !body.aim) {
    return res.status(400).json({ message: 'Practical number, title, and aim are required.' });
  }

  try {
    if (getMongoStatus()) {
      const existing = await Practical.findOne({ practicalNumber: Number(body.practicalNumber) });
      if (existing) {
        return res.status(400).json({ message: 'A practical with this number already exists.' });
      }

      const practical = await Practical.create({
        practicalNumber: Number(body.practicalNumber),
        title: body.title,
        aim: body.aim,
        objective: body.objective || '',
        apparatus: body.apparatus || '',
        theory: body.theory || '',
        algorithm: body.algorithm || '',
        program: body.program || '',
        procedure: body.procedure || '',
        sampleOutput: body.sampleOutput || '',
        conclusion: body.conclusion || '',
        topics: Array.isArray(body.topics) ? body.topics : [],
        subjectId: body.subjectId || 'subject-dsa',
        departmentId: body.departmentId || 'dept-ai-ml',
        semester: body.semester || 'III',
        academicYear: body.academicYear || '2025-26',
        status: body.status || 'Published',
        pdfUrl: body.pdfUrl || '',
      });

      return res.status(201).json(practical);
    }

    const duplicate = inMemoryStore.practicals.some((item) => Number(item.practicalNumber) === Number(body.practicalNumber));
    if (duplicate) {
      return res.status(400).json({ message: 'A practical with this number already exists.' });
    }

    const practical = {
      _id: `practical-${String(body.practicalNumber).padStart(2, '0')}`,
      practicalNumber: Number(body.practicalNumber),
      title: body.title,
      aim: body.aim,
      objective: body.objective || '',
      apparatus: body.apparatus || '',
      theory: body.theory || '',
      algorithm: body.algorithm || '',
      program: body.program || '',
      procedure: body.procedure || '',
      sampleOutput: body.sampleOutput || '',
      conclusion: body.conclusion || '',
      topics: Array.isArray(body.topics) ? body.topics : [],
      subjectId: body.subjectId || 'subject-dsa',
      departmentId: body.departmentId || 'dept-ai-ml',
      semester: body.semester || 'III',
      academicYear: body.academicYear || '2025-26',
      status: body.status || 'Published',
      pdfUrl: body.pdfUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inMemoryStore.practicals.push(practical);
    return res.status(201).json(practical);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save practical.' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const body = req.body;

  try {
    if (getMongoStatus()) {
      const practical = await Practical.findOneAndUpdate(
        { practicalNumber: Number(req.params.id) },
        { ...body, practicalNumber: Number(body.practicalNumber || req.params.id), updatedAt: new Date() },
        { new: true }
      );

      if (!practical) {
        return res.status(404).json({ message: 'Practical not found.' });
      }

      return res.json(practical);
    }

    const index = inMemoryStore.practicals.findIndex((item) => String(item.practicalNumber) === String(req.params.id));
    if (index === -1) {
      return res.status(404).json({ message: 'Practical not found.' });
    }

    const updated = {
      ...inMemoryStore.practicals[index],
      ...body,
      practicalNumber: Number(body.practicalNumber || req.params.id),
      updatedAt: new Date().toISOString(),
    };

    inMemoryStore.practicals[index] = updated;
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update practical.' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (getMongoStatus()) {
      const deleted = await Practical.findOneAndDelete({ practicalNumber: Number(req.params.id) });
      if (!deleted) {
        return res.status(404).json({ message: 'Practical not found.' });
      }
      return res.json({ success: true, message: 'Practical deleted.' });
    }

    const next = inMemoryStore.practicals.filter((item) => String(item.practicalNumber) !== String(req.params.id));
    if (next.length === inMemoryStore.practicals.length) {
      return res.status(404).json({ message: 'Practical not found.' });
    }

    inMemoryStore.practicals = next;
    return res.json({ success: true, message: 'Practical deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete practical.' });
  }
});

export default router;
