import express from "express";
import {
  getAllRequests,
  createRequest,
  markFulfilled,
} from "../controllers/bloodRequestController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllRequests);

router.post("/", authMiddleware, createRequest);

router.put("/:id/fulfilled", authMiddleware, markFulfilled);

export default router;