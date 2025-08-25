// backend/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); // loads backend/.env

const app = express();

// Allow JSON request bodies
app.use(express.json());

// CORS (adjust origin if your frontend runs elsewhere)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
await connectDB();

// --- Checkpoint 1 demo routes (simple GET + POST) ---

// GET: health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});

// POST: echo back whatever the client sends
app.post("/api/echo", (req, res) => {
  res.status(201).json({
    received: req.body || null,
    note: "This is a simple POST echo endpoint.",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
