import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: [
        "General Manager",
        "Auditor",
        "Finance And Resource Head",
        "School Director",
        "HR Head",
        "Student",
      ],
    },
    paymentData: {
      type: Map, // For dynamic key-value pairs (specific to students)
      of: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
