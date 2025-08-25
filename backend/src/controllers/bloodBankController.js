import BloodBank from "../models/BloodBank.js";
import { validationResult } from "express-validator";

// @desc    Get all blood banks (alphabetical order)
// @route   GET /api/blood-banks
// @access  Public
export const getBloodBanks = async (req, res, next) => {
  try {
    const banks = await BloodBank.find().sort({ name: 1 }); // A-Z
    res.status(200).json(banks);
  } catch (error) {
    next(error); // handled by errorHandler.js
  }
};

// @desc    Add a new blood bank
// @route   POST /api/blood-banks
// @access  Public (later maybe admin only)
export const addBloodBank = async (req, res, next) => {
  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, phone } = req.body;

  try {
    const newBank = await BloodBank.create({ name, address, phone });
    res.status(201).json({
      message: "Blood bank created successfully",
      data: newBank,
    });
  } catch (error) {
    next(error); // handled by errorHandler.js
  }
};
