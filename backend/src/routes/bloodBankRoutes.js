import express from "express";
import { body } from "express-validator";
import { getBloodBanks, addBloodBank } from "../controllers/bloodBankController.js";

const router = express.Router();

// @route   GET /api/blood-banks
// @desc    Get all blood banks
router.get("/", getBloodBanks);

// @route   POST /api/blood-banks
// @desc    Add a new blood bank
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ],
  addBloodBank
);

export default router;
