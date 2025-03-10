import mongoose from "mongoose";

const ApprovedBudgetSchema = new mongoose.Schema({
  actor: {
    type: String,
    required: true,
    enum: [
      "School Director",
      "Human Resource Head",
      "Resource and Finance Head",
    ],
  },
  category: { type: String, required: true }, // Budget category
  amount: { type: Number, required: true }, // Budget amount
  description: { type: String },
  approvedBy: { type: String, required: true }, // General Manager's ID or name
  approvedAt: { type: Date, default: Date.now }, // Timestamp
});

const ApprovedBudget = mongoose.model("ApprovedBudget", ApprovedBudgetSchema);
export default ApprovedBudget;

