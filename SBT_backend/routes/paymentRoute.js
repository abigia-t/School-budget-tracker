import express from "express";
import {registerPayment,getPaymentByStudentId,updatePayment,deletePayment 
} from "../controllers/paymentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// **Payment Routes**
router.post("/payment", registerPayment);               // Register a payment for a student
router.get("/payment/:studentId", getPaymentByStudentId); // Get all payments of a student
router.put("/payment/:studentId/:paymentId", updatePayment); // Update a student's payment
router.delete("/payment/:studentId/:paymentId", deletePayment); // Delete a student's payment

export default router;