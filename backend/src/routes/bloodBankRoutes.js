import express from "express";
import { body } from "express-validator";
import { getBloodBanks, addBloodBank } from "../controllers/bloodBankController.js";

const router = express.Router();


router.get("/", getBloodBanks);


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
