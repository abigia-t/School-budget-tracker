import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique:true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true }, 
    lastName: { type: String, required: true },  
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }, 
    address: { type: String, required: true },
    role: { type: String, required: true, enum: ["Student"] },
    paymentData: {
      type: Object,
      default: () => ({}),
    }
  },
  { timestamps: true, minimize: false }
);

const studentModel =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default studentModel;
