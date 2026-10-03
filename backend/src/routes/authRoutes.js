import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inMemoryStore } from '../config/store.js';
import { getMongoStatus } from '../config/db.js';
import Admin from '../models/Admin.js';

const router = express.Router();

const adminEmail = process.env.ADMIN_EMAIL || 'admin@tgpcet.edu.in';
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    if (getMongoStatus()) {
      const admin = await Admin.findOne({ email: email.toLowerCase() });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid login credentials.' });
      }

      const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid login credentials.' });
      }

      const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET || 'development-secret', {
        expiresIn: '7d',
      });

      res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false });
      return res.json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email } });
    }

    const match = email.toLowerCase() === adminEmail.toLowerCase() && (await bcrypt.compare(password, inMemoryStore.admin.passwordHash || bcrypt.hashSync(adminPassword, 10)));

    if (!match) {
      return res.status(401).json({ message: 'Invalid login credentials.' });
    }

    const token = jwt.sign({ id: inMemoryStore.admin._id, email: inMemoryStore.admin.email, role: 'admin' }, process.env.JWT_SECRET || 'development-secret', {
      expiresIn: '7d',
    });

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false });
    return res.json({ success: true, token, admin: { id: inMemoryStore.admin._id, name: inMemoryStore.admin.name, email: inMemoryStore.admin.email } });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to authenticate at this time.' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

router.get('/me', (req, res) => {
  return res.json({ admin: inMemoryStore.admin });
});

export default router;
