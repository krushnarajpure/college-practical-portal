import express from "express";
import { body } from "express-validator";
import { login, logout, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validators.js";

const router = express.Router();

router.post(
  "/login",
  [body("email").isEmail().withMessage("Valid email is required"), body("password").isLength({ min: 6 })],
  validate,
  login
);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
