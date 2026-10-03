import express from "express";
import { body } from "express-validator";
import {
  createPractical,
  deletePractical,
  getPractical,
  listPracticals,
  updatePractical,
} from "../controllers/practicalController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validators.js";

const router = express.Router();

const practicalValidation = [
  body("practicalNumber").isInt({ min: 1 }).withMessage("Practical number is required"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("aim").trim().notEmpty().withMessage("Aim is required"),
  body("objective").trim().notEmpty().withMessage("Objective is required"),
  body("apparatus").trim().notEmpty().withMessage("Apparatus is required"),
  body("theory").trim().notEmpty().withMessage("Theory is required"),
  body("algorithm").trim().notEmpty().withMessage("Algorithm is required"),
  body("program").trim().notEmpty().withMessage("Program is required"),
  body("procedure").trim().notEmpty().withMessage("Procedure is required"),
  body("sampleOutput").trim().notEmpty().withMessage("Sample output is required"),
  body("conclusion").trim().notEmpty().withMessage("Conclusion is required"),
  body("topic").trim().notEmpty().withMessage("Topic is required"),
  body("subjectId").isMongoId().withMessage("Subject is required"),
  body("departmentId").isMongoId().withMessage("Department is required"),
  body("semester").trim().notEmpty().withMessage("Semester is required"),
  body("academicYear").trim().notEmpty().withMessage("Academic year is required"),
  body("status").isIn(["Draft", "Published"]).withMessage("Status is invalid"),
];

router.get("/", listPracticals);
router.get("/:id", getPractical);
router.post("/", requireAuth, practicalValidation, validate, createPractical);
router.put("/:id", requireAuth, practicalValidation, validate, updatePractical);
router.delete("/:id", requireAuth, deletePractical);

export default router;
