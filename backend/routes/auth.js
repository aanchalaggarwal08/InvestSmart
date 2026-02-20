import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();

/* ===============================
   USER MODEL (MongoDB)
================================ */
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

/* ===============================
   SIGNUP
================================ */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ success: true, message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===============================
   LOGIN
================================ */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: userWithoutPassword
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
