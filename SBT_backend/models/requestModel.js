import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  actorId: { type: String, required: true }, 
  requestCategory: { type: String, required: true },
  fiscalYear: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  attachments: { type: [String] }, // Optional file paths
}, { timestamps: true });

const Request = mongoose.model("Request", requestSchema);
export default Request;
