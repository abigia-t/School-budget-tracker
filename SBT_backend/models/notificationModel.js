import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientType: {type: String, required: true, 
      enum: ["actors", "student_parents", "specific_actor", "specific_student"] 
    },
    recipientDetail: { type: String, default: null }, // Email for Actor, Student ID for Parent
    message: { type: String, required: true },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "Actor", required: true,
      // In case the admin ID is a string, we'll support both ObjectId and String
      // So it's flexible for both future JWT-based and current hardcoded admin approach
    },
  },
  { timestamps: true }
);

// Check if Notification model already exists in Mongoose, otherwise, create it
const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default Notification;
