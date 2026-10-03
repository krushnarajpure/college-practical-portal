import express from "express";
import multer from "multer";
import path from "path";
import { deletePdf, getPdf, listPdfs, uploadPdf } from "../controllers/pdfController.js";
import { requireAuth } from "../middleware/auth.js";
import { ApiError } from "../utils/errors.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.resolve(process.cwd(), "src/uploads")),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") return cb(new ApiError(400, "Only PDF files are allowed"));
    cb(null, true);
  },
});

router.get("/", requireAuth, listPdfs);
router.post("/", requireAuth, upload.single("pdf"), uploadPdf);
router.get("/:id", getPdf);
router.delete("/:id", requireAuth, deletePdf);

export default router;
