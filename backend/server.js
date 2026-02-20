// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.js";
// import mongoose from "mongoose";


// dotenv.config();
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log("MongoDB error:", err));

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Use the auth routes
// app.use("/auth", authRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(5000, () => console.log(`Server running on port ${PORT}`));
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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
app.use(cors());
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