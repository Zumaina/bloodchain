// backend/routes/infoRoutes.js
import express from "express";
import { getInfos, getInfoBySlug, createInfo } from "../controllers/infoController.js";
// (if your file uses require/module.exports, adjust accordingly)

const router = express.Router();

// keep list-all route first
router.get("/", getInfos);

// dynamic slug route
router.get("/:slug", getInfoBySlug);

// create
router.post("/", createInfo);

export default router;
