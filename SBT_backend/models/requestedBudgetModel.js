import mongoose from 'mongoose';

const requestedBudgetSchema = new mongoose.Schema({
    actor: {
      type: String,
      enum: ['School Director', 'Human Resource', 'Resource and Finance'],
      required: true,
      trim: true,
    },

    budgetAmount: {
      type: Number,
      required: true,
      min: [0, 'Budget amount must be above 0'], 
    },

    budgetPurpose: {
      type: String,
      required: true,
      trim: true, 
    },

    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor', // Refers to the Actor model for the GM
      required: true,
    },

    requestDate: {
      type: Date,
      default: Date.now,
    },

    approvedAmount: {
      type: Number,
      default: 0,
      min: [0, 'Approved amount not be negative.'], 
    },

    message: {
      type: String,
      default: '',
      trim: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const RequestedBudget = mongoose.models.RequestedBudget || mongoose.model('RequestedBudget', requestedBudgetSchema);

export default RequestedBudget;