

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://investsmart-app.netlify.app"
  ],
  credentials: true
}));
app.use(express.json());

/* ===============================
   CONNECT MONGODB
================================ */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB connected");

  /* ===============================
     START SERVER ONLY AFTER DB CONNECTS
  ================================= */
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

})
.catch(err => {
  console.log("❌ MongoDB connection error:", err);
});
  
/* ===============================
   ROUTES
================================ */
app.use("/auth", authRoutes);