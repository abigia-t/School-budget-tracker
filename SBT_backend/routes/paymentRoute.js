// routes/paymentRoute.js
import express from "express";
import mongoose from "mongoose";
import Chapa from "chapa";

const router = express.Router();
const myChapa = new Chapa("CHASECK_TEST-J6yJZv2uvUsKQ4J6LB3PTMQQB35VOmOl");

// Payment Schema
const paymentSchema = new mongoose.Schema({
  studentId: String,
  txRef: String,
  amount: Number,
  currency: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

// controller function to get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    console.error("Fetch Payments Error:", error);
    res.status(500).json({ message: "Failed to fetch payments.", error });
  }
};

// Controller function to get payments by studentId
const getPaymentsByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const payments = await Payment.find({ studentId }).sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No payments found for this student." });
    }

    res.status(200).json(payments);
  } catch (error) {
    console.error("Fetch Payments by Student ID Error:", error);
    res.status(500).json({ message: "Failed to fetch payments.", error });
  }
};


// Initialize Payment
router.post("/initialize", async (req, res) => {
  try {
    const { studentId, amount, email, firstName, lastName } = req.body;

    if (!studentId || !amount || !email || !firstName || !lastName) {
      console.log("Missing fields in request:", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    const customerInfo = {
      amount: amount.toString(),
      currency: "ETB",
      email,
      first_name: firstName,
      last_name: lastName,
      callback_url: `http://localhost:5000/api/payments/verify`,
      customization: {
        title: "School Fee Payment",
        description: "Payment for student fees",
      },
    };

    console.log("Initializing Chapa payment with:", customerInfo); // Debug log
    const response = await myChapa.initialize(customerInfo, { autoRef: true });

    if (response.status === "failed") {
      throw new Error(response.message);
    }

    // Save initial payment record
    const payment = new Payment({
      studentId,
      txRef: response.tx_ref,
      amount,
      currency: "ETB",
      status: "pending",
    });
    payment.status = response.status;
    await payment.save();

    res.json({
      checkoutUrl: response.data.checkout_url,
      txRef: response.tx_ref,
    });
  } catch (error) {
    console.error("Payment Initialization Error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    res.status(500).json({
      error: "Payment initialization failed",
      details: error.message,
    });
  }
});

// Verify Payment
router.get("/verify", async (req, res) => {
  try {
    const txRef = req.query.tx_ref;
    if (!txRef) {
      return res.status(400).send("Transaction reference is required");
    }

    const response = await myChapa.verify(txRef);

    if (response.status === "failed") {
      throw new Error(response.message);
    }

    await Payment.updateOne({ txRef }, { status: response.status });

    res.redirect("http://localhost:3000/parent/payment-return");
  } catch (error) {
    console.error("Payment Verification Error:", error.message);
    res.status(500).send(`Verification failed: ${error.message}`);
  }
});

router.get("/", getAllPayments); // Get all payments

router.get("/:studentId", getPaymentsByStudentId); // Get payment by ID

export default router;
