
import express from "express";
import { getInfos, getInfoBySlug, createInfo } from "../controllers/infoController.js";


const router = express.Router();


router.get("/", getInfos);


router.get("/:slug", getInfoBySlug);


router.post("/", createInfo);

export default router;
