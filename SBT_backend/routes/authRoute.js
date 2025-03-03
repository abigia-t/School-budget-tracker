import express from 'express';
import { register, login } from "../controllers/authController.js"; // Fixed import
import { protect, authorize } from '../middleware/authMiddleware.js'; // Ensure file extension

const router = express.Router();

// Register a user
router.post("/register", register);
router.post('/login', login);
router.get('/profile', protect, (req, res) => res.json({ user: req.user }));

// Admin panel route - accessible to multiple roles
router.get(
  "/admin",
  protect,
  authorize("general_manager", "auditor", "finance_and_resource_head", "school_director", "hr_head"),
  (req, res) => {
    res.send("Admin Panel - Authorized Access");
  }
);

export default router;
