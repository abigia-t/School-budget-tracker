import Student from "../models/studentModel.js";

// **1. Register a Payment (Add to Student Model)**
export const registerPayment = async (req, res) => {
  try {
    const { studentId, amount, method, status } = req.body;

    if (!studentId || !amount || !method || !status) {
      return res.json({ status: false, message: "All fields are required." });
    }

    // Find student
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.json({ status: false, message: "Student not found." });
    }
    // Add payment data inside the student's model
    student.paymentData.push({
      amount,
      method,
      status,
      date: new Date(),
    });

    await student.save();
    res.json({ status: true, message: "Payment registered successfully", student });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **2. Get Payments for a Specific Student**
export const getPaymentByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.json({ status: false, message: "Student not found." });
    }

    res.status(200).json(student.paymentData);
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **3. Update a Payment Record**
export const updatePayment = async (req, res) => {
  try {
    const { studentId, paymentId } = req.params;
    const { amount, method, status } = req.body;

    const student = await Student.findOne({ studentId });
    if (!student) return res.json({ status: false, message: "Student not found" });

    const payment = student.paymentData.id(paymentId);
    if (!payment) return res.json({ status: false, message: "Payment not found" });

    // Update only provided fields
    if (amount) payment.amount = amount;
    if (method) payment.method = method;
    if (status) payment.status = status;

    await student.save();
    res.json({ status: true, message: "Payment updated successfully", student });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};

// **4. Delete a Payment Record**
export const deletePayment = async (req, res) => {
  try {
    const { studentId, paymentId } = req.params;

    const student = await Student.findOne({ studentId });
    if (!student) return res.json({ status: false, message: "Student not found" });

    student.paymentData = student.paymentData.filter((p) => p._id.toString() !== paymentId);
    
    await student.save();
    res.json({ status: true, message: "Payment deleted successfully", student });
  } catch (error) {
    res.json({ status: false, message: error.message || "Server error" });
  }
};