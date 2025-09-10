import Hospital from "../models/Hospital.js";
import { validationResult } from "express-validator";

export const getHospitals = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find().sort({ name: 1 }); 
    res.status(200).json(hospitals);
  } catch (error) {
    next(error);
  }
};

export const addHospital = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, location, phone } = req.body;

  try {
    const newHospital = await Hospital.create({ name, location, phone });
    res.status(201).json({
      message: "Hospital created successfully",
      data: newHospital,
    });
  } catch (error) {
    next(error);
  }
};
