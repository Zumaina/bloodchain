import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import infoRoutes from "./routes/infoRoutes.js";
import bloodBankRoutes from "./routes/bloodBankRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bloodRequestRoutes from "./routes/bloodRequestRoutes.js"; 

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

await connectDB();

app.use("/api/info", infoRoutes);
app.use("/api/blood-banks", bloodBankRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});