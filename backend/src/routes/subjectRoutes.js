import express from "express";
import { body } from "express-validator";
import {
  createSubject,
  deleteSubject,
  listSubjects,
  updateSubject,
} from "../controllers/subjectController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validators.js";

const router = express.Router();

const validation = [
  body("name").trim().notEmpty().withMessage("Subject name is required"),
  body("code").trim().notEmpty().withMessage("Subject code is required"),
  body("semester").trim().notEmpty().withMessage("Semester is required"),
  body("departmentId").isMongoId().withMessage("Department is required"),
];

router.get("/", listSubjects);
router.post("/", requireAuth, validation, validate, createSubject);
router.put("/:id", requireAuth, validation, validate, updateSubject);
router.delete("/:id", requireAuth, deleteSubject);

export default router;
