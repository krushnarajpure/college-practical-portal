import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true },
    semester: { type: String, required: true, trim: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  },
  { timestamps: true }
);

subjectSchema.index({ code: 1, departmentId: 1 }, { unique: true });

export default mongoose.model("Subject", subjectSchema);
