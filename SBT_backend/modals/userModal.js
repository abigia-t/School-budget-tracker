import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, enum: ["General Manager", "School Director", "System Admin", "Auditor", "HR Head", "Finance Head", "Parent"], required: true },
    paymentData: { type: Object, default: null }, // Only for Parents
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
