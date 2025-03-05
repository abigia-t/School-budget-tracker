import express from "express";
import { makePayment } from "../controllers/paymentController.js";

const router = express.Router();

// Route for Parent/Student to make a payment
router.post("/make-payment", makePayment);

export default router;
