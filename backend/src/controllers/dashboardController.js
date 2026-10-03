import Department from "../models/Department.js";
import PdfFile from "../models/PdfFile.js";
import Practical from "../models/Practical.js";
import Subject from "../models/Subject.js";

export async function getDashboardStats(_req, res, next) {
  try {
    const [totalPracticals, publishedPracticals, draftPracticals, totalPdfs, totalSubjects] =
      await Promise.all([
        Practical.countDocuments(),
        Practical.countDocuments({ status: "Published" }),
        Practical.countDocuments({ status: "Draft" }),
        PdfFile.countDocuments(),
        Subject.countDocuments(),
      ]);

    const totalDepartments = await Department.countDocuments();

    res.json({
      totalPracticals,
      publishedPracticals,
      draftPracticals,
      totalPdfs,
      totalSubjects,
      totalDepartments,
    });
  } catch (error) {
    next(error);
  }
}
