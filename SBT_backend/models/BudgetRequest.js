import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String,
  size: Number
});

const budgetRequestSchema = new mongoose.Schema({
  requestCategory: {
    type: String,
    required: true,
    enum: ['budgetAdjustment', 'emergencyFund', 'largePurchase', 'contractApproval']
  },
  fiscalYear: {
    type: String,
    required: true,
    enum: ['2023-2024', '2024-2025']
  },
  subject: String,
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    min: 0
  },
  attachments: [attachmentSchema],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Change this to default export
const BudgetRequest = mongoose.model('BudgetRequest', budgetRequestSchema);
export default BudgetRequest;