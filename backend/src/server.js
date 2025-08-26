import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import infoRoutes from "./routes/infoRoutes.js";

import bloodBankRoutes from "./routes/bloodBankRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

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

// --- Real Routes ---
app.use("/api/info", infoRoutes);
app.use("/api/blood-banks", bloodBankRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
