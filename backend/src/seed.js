import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";
import Department from "./models/Department.js";
import Practical from "./models/Practical.js";
import Setting from "./models/Setting.js";
import Subject from "./models/Subject.js";
import { practicalSeedContent } from "./seedData.js";

dotenv.config();

async function run() {
  await connectDB(process.env.MONGODB_URI);

  const department = await Department.findOneAndUpdate(
    { name: "Artificial Intelligence & Machine Learning" },
    {
      name: "Artificial Intelligence & Machine Learning",
      code: "AIML",
      description: "Department of Artificial Intelligence & Machine Learning",
    },
    { upsert: true, new: true }
  );

  const subject = await Subject.findOneAndUpdate(
    { code: "BAI12303", departmentId: department._id },
    {
      name: "Data Structure & Algorithms Lab",
      code: "BAI12303",
      semester: "III",
      departmentId: department._id,
    },
    { upsert: true, new: true }
  );

  const practicalDocs = practicalSeedContent.map((p) => ({
    ...p,
    subjectId: subject._id,
    departmentId: department._id,
    semester: "B.Tech – Sem III",
    academicYear: "2026-27",
    status: "Published",
  }));

  await Practical.deleteMany({ subjectId: subject._id });
  await Practical.insertMany(practicalDocs);

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required for seed");

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash, name: "Portal Admin" },
    { upsert: true, new: true }
  );

  await Setting.findOneAndUpdate(
    { key: "collegeProfile" },
    {
      key: "collegeProfile",
      value: {
        college: "Tulsiramji Gaikwad-Patil College of Engineering and Technology",
        address: "Wardha Road, Nagpur - 441108",
        department: "Department of Artificial Intelligence & Machine Learning",
      },
    },
    { upsert: true, new: true }
  );

  console.log("Seed complete");
  process.exit(0);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
