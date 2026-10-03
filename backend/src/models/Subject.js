import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    departmentId: { type: String, required: true },
    semester: { type: String, required: true },
    academicYear: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Subject || mongoose.model('Subject', subjectSchema);
