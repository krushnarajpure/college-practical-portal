import mongoose from 'mongoose';

const practicalSchema = new mongoose.Schema(
  {
    practicalNumber: { type: Number, required: true },
    title: { type: String, required: true },
    aim: { type: String, required: true },
    objective: { type: String },
    apparatus: { type: String },
    theory: { type: String },
    algorithm: { type: String },
    program: { type: String },
    procedure: { type: String },
    sampleOutput: { type: String },
    conclusion: { type: String },
    topics: [{ type: String }],
    subjectId: { type: String },
    departmentId: { type: String },
    semester: { type: String },
    academicYear: { type: String },
    pdfUrl: { type: String, default: '' },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  },
  { timestamps: true }
);

export default mongoose.models.Practical || mongoose.model('Practical', practicalSchema);
