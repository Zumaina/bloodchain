import express from "express";
import { body } from "express-validator";
import { getHospitals, addHospital } from "../controllers/hospitalController.js";

const router = express.Router();

// GET all hospitals
router.get("/", getHospitals);

// POST new hospital with validation
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Hospital name is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ],
  addHospital
);

export default router;
