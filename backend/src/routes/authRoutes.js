import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone")
      .optional()
      .isMobilePhone("any")
      .withMessage("Invalid phone number"),
  ],
  registerUser
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  loginUser
);

// GET /api/auth/me (protected)
router.get("/me", auth, getMe);

export default router;
