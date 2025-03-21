import express from "express";
import {
  createBudgetRequest,
  getAllBudgetRequests,
  getBudgetRequestById,
  updateBudgetRequestStatus,
  deleteBudgetRequest
} from "../controllers/requestedBudgetController.js";

const router = express.Router();

// Routes for handling budget requests
router.post("/budgetRequests", createBudgetRequest);  // Create a new budget request
router.get("/budgetRequests", getAllBudgetRequests);  // Get all budget requests
router.get("/budgetRequests/:id", getBudgetRequestById);  // Get a specific budget request by ID
router.put("/budgetRequests/:id", updateBudgetRequestStatus);  // Update status of a budget request
router.delete("/budgetRequests/:id", deleteBudgetRequest);  // Delete a budget request

export default router;