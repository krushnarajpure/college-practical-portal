import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { defaultAdmin, defaultDepartments, defaultPracticals, defaultSubjects } from '../src/data/defaultData.js';
import Admin from '../src/models/Admin.js';
import Practical from '../src/models/Practical.js';
import Subject from '../src/models/Subject.js';
import Department from '../src/models/Department.js';

const mongoUri = process.env.MONGODB_URI;

async function seed() {
  if (!mongoUri) {
    console.log('No MONGODB_URI set. Skipping seed in fallback mode.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@tgpcet.edu.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    await Department.deleteMany({});
    await Subject.deleteMany({});
    await Practical.deleteMany({});
    await Admin.deleteMany({});

    const createdDepartment = await Department.create(defaultDepartments);
    const createdSubjects = await Subject.create(defaultSubjects.map((item) => ({ ...item, departmentId: createdDepartment[0]._id.toString() })));

    await Admin.create({
      name: defaultAdmin.name,
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: 'admin',
    });

    for (const practical of defaultPracticals) {
      await Practical.create({
        ...practical,
        subjectId: createdSubjects[0]._id.toString(),
        departmentId: createdDepartment[0]._id.toString(),
      });
    }

    console.log('Database seed complete.');
  } catch (error) {
    console.error('Seed failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
