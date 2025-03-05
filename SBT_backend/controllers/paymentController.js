import User from "../modals/userModal.js";

export const makePayment = async (req, res) => {
  try {
    const { studentId, parentName, amountPaid, transactionId } = req.body;

    // Check if payment fields are provided
    if (!studentId || !parentName || !amountPaid || !transactionId) {
      return res
        .status(400)
        .json({ message: "All payment fields are required" });
    }

    // Find student
    const student = await User.findById(studentId);
    if (!student || student.role !== "Student") {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update payment data
    student.paymentData = {
      parentName,
      amountPaid,
      transactionId,
      paidAt: new Date(),
    };

    await student.save();

    res
      .status(200)
      .json({
        message: "Payment recorded successfully",
        paymentData: student.paymentData,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
