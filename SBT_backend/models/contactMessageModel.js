import mongoose from "mongoose";

// Define schema for contact messages
const contactMessageSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userMessage: { type: String, required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the ContactMessage model
const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;