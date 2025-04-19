import mongoose from "mongoose";

const budgetRequestSchema = new mongoose.Schema(
  {
    //for GM only
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
    //for requesters only
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: false,
    },
    //for requesters only
    approvedAt: {
      type: Date,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    fiscalYear: {
      type: String,
      required: false,
    },
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 50,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: false, // optional field for reciept image URL
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // Match frontend select options (capitalized)
    },
  },
  { timestamps: true }
);

const BudgetRequest =
  mongoose.models.BudgetRequest ||
  mongoose.model("BudgetRequest", budgetRequestSchema);
export default BudgetRequest;
