import express from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users(name, email, password) VALUES(?,?,?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) return res.json({ success: false, message: "Email already exists" });
        res.json({ success: true, message: "Signup successful" });
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (results.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ success: false, message: "Error comparing passwords" });
      if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: "JWT secret not set" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      const { password, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: userWithoutPassword
      });
    });
  });
});

export default router;
