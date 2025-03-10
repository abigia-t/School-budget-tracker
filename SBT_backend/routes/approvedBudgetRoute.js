import express from "express";
import { approveOrRejectBudget, getApprovedBudgetsForAuditor } from "../controllers/approvedBudgetController.js";

const router = express.Router();

router.post("/approve-or-reject", approveOrRejectBudget); // General Manager approves/rejects a request
router.get("/approved-budgets", getApprovedBudgetsForAuditor); // Auditor fetches only approved budgets

export default router;