import bcrypt from 'bcryptjs';
import { defaultAdmin, defaultDepartments, defaultPracticals, defaultSubjects } from '../data/defaultData.js';

const fallbackAdminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
const fallbackHash = bcrypt.hashSync(fallbackAdminPassword, 10);

export const inMemoryStore = {
  admin: { ...defaultAdmin, passwordHash: fallbackHash },
  departments: [...defaultDepartments],
  subjects: [...defaultSubjects],
  practicals: [...defaultPracticals],
  pdfs: [],
  activityLogs: [],
};

export function ensureSeededData() {
  if (!inMemoryStore.practicals.length) {
    inMemoryStore.practicals = [...defaultPracticals];
  }
  if (!inMemoryStore.departments.length) {
    inMemoryStore.departments = [...defaultDepartments];
  }
  if (!inMemoryStore.subjects.length) {
    inMemoryStore.subjects = [...defaultSubjects];
  }
  if (!inMemoryStore.admin.email) {
    inMemoryStore.admin = { ...defaultAdmin, passwordHash: fallbackHash };
  }
}
