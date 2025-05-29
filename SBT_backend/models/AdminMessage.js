import mongoose from 'mongoose';

const adminMessageSchema = new mongoose.Schema({
  recipientType: {
    type: String,
    required: true,
    enum: ['actors', 'student_parents', 'specific_actor', 'specific_student']
  },
  recipientDetail: {
    type: String,
    required: function() {
      return ['specific_actor', 'specific_student'].includes(this.recipientType);
    }
  },
  message: {
    type: String,
    required: true
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if model already exists before creating it
const AdminMessage = mongoose.models.AdminMessage || 
                    mongoose.model('AdminMessage', adminMessageSchema);

export default AdminMessage;