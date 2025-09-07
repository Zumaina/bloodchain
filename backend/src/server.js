import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import infoRoutes from "./routes/infoRoutes.js";
import bloodBankRoutes from "./routes/bloodBankRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import authRoutes from "./routes/authRoutes.js"; //  NEW

// Middleware
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// JSON body support
app.use(express.json());

// CORS (hardcoded as per CP-2 decision)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
await connectDB();

// Mount routes
app.use("/api/info", infoRoutes);
app.use("/api/blood-banks", bloodBankRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/auth", authRoutes); 

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
