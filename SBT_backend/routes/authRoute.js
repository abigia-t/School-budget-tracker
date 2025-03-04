import express from 'express';
import { register, login, logout } from "../controllers/authController.js";
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register and Login routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Profile route (accessible to all authenticated users)
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});

// General Manager page (Only accessible by General Manager)
router.get(
  "/general-manager",
  protect,
  authorize("general_manager"),
  (req, res) => {
    res.send("Welcome to the General Manager Page!");
  }
);

// Auditor page (Only accessible by Auditor)
router.get(
  "/auditor",
  protect,
  authorize("auditor"),
  (req, res) => {
    res.send("Welcome to the Auditing Page!");
  }
);

// Finance & Resource Head page
router.get(
  "/finance",
  protect,
  authorize("finance_and_resource_head"),
  (req, res) => {
    res.send("Welcome to the Finance & Resource Head Page!");
  }
);

// School Director page
router.get(
  "/school-director",
  protect,
  authorize("school_director"),
  (req, res) => {
    res.send("Welcome to the School Director Page!");
  }
);

// HR Head page
router.get(
  "/hr-head",
  protect,
  authorize("hr_head"),
  (req, res) => {
    res.send("Welcome to the HR Head Page!");
  }
);

// Student page
router.get(
  "/student",
  protect,
  authorize("student"),
  (req, res) => {
    res.send("Welcome to the Student Page!");
  }
);

export default router;
