import express from "express";
import {
  getAllRequests,
  createRequest,
  markFulfilled,
} from "../controllers/bloodRequestController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: view all NON-fulfilled requests
router.get("/", getAllRequests);

// Protected: create a new request
router.post("/", authMiddleware, createRequest);

// Protected: mark your request as fulfilled
router.put("/:id/fulfilled", authMiddleware, markFulfilled);

export default router;