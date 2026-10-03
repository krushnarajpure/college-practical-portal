import fs from "fs";
import path from "path";
import PdfFile from "../models/PdfFile.js";
import { ApiError } from "../utils/errors.js";

const uploadsDir = path.resolve(process.cwd(), "src/uploads");

export async function uploadPdf(req, res, next) {
  try {
    if (!req.file) throw new ApiError(400, "Upload failed");

    const file = await PdfFile.create({
      originalName: req.file.originalname,
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.admin?.id,
    });

    res.status(201).json(file);
  } catch (error) {
    next(error);
  }
}

export async function getPdf(req, res, next) {
  try {
    const file = await PdfFile.findById(req.params.id);
    if (!file) throw new ApiError(404, "PDF unavailable");

    const absolutePath = path.resolve(uploadsDir, path.basename(file.path));
    if (!fs.existsSync(absolutePath)) throw new ApiError(404, "PDF unavailable");

    const mode = req.query.mode === "download" ? "download" : "inline";
    res.setHeader("Content-Type", file.mimeType);
    res.setHeader("Content-Disposition", `${mode}; filename=\"${file.originalName}\"`);
    fs.createReadStream(absolutePath).pipe(res);
  } catch (error) {
    next(error);
  }
}

export async function listPdfs(_req, res, next) {
  try {
    const files = await PdfFile.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    next(error);
  }
}

export async function deletePdf(req, res, next) {
  try {
    const file = await PdfFile.findByIdAndDelete(req.params.id);
    if (!file) throw new ApiError(404, "PDF unavailable");

    const absolutePath = path.resolve(uploadsDir, path.basename(file.path));
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);

    res.json({ message: "PDF deleted" });
  } catch (error) {
    next(error);
  }
}
