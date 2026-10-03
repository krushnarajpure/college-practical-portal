import express from "express";
import { body } from "express-validator";
import {
  createDepartment,
  deleteDepartment,
  listDepartments,
  updateDepartment,
} from "../controllers/departmentController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validators.js";

const router = express.Router();
const validation = [body("name").trim().notEmpty().withMessage("Department name is required")];

router.get("/", listDepartments);
router.post("/", requireAuth, validation, validate, createDepartment);
router.put("/:id", requireAuth, validation, validate, updateDepartment);
router.delete("/:id", requireAuth, deleteDepartment);

export default router;
