// routes/paymentRoute.js
import express from "express";
import mongoose from "mongoose";
import Chapa from "chapa";

const router = express.Router();
const myChapa = new Chapa(process.env.CHAPA_SECRET_KEY);

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

// Initialize Payment
router.post("/initialize", async (req, res) => {
  try {
    const { studentId, amount, email, firstName, lastName } = req.body;

    if (!studentId || !amount || !email || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const customerInfo = {
      amount: amount.toString(),
      currency: "ETB",
      email,
      first_name: firstName,
      last_name: lastName,
      callback_url: `${process.env.BACKEND_URL}/api/payments/verify`,
      customization: {
        title: "School Fee Payment",
        description: "Payment for student fees",
      },
    };

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
    await payment.save();

    res.json({
      checkoutUrl: response.data.checkout_url,
      txRef: response.tx_ref,
    });
  } catch (error) {
    console.error("Payment Initialization Error:", error.message);
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

export default router;
