import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    practicalNumber: { type: Number, required: true },
    subject: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    fileSize: { type: Number, default: 0 },
    status: { type: String, default: 'Active' },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PdfFile || mongoose.model('PdfFile', pdfSchema);
