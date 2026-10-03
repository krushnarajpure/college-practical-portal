import mongoose from "mongoose";

const practicalSchema = new mongoose.Schema(
  {
    practicalNumber: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: "" },
    aim: { type: String, required: true },
    objective: { type: String, required: true },
    apparatus: { type: String, required: true },
    theory: { type: String, required: true },
    algorithm: { type: String, required: true },
    program: { type: String, required: true },
    procedure: { type: String, required: true },
    sampleOutput: { type: String, required: true },
    conclusion: { type: String, required: true },
    topic: { type: String, required: true, trim: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    semester: { type: String, required: true, trim: true },
    academicYear: { type: String, required: true, trim: true },
    pdfId: { type: mongoose.Schema.Types.ObjectId, ref: "PdfFile", default: null },
    pdfUrl: { type: String, default: "" },
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  },
  { timestamps: true }
);

practicalSchema.index({ practicalNumber: 1, subjectId: 1 }, { unique: true });

export default mongoose.model("Practical", practicalSchema);
