import AdminMessage from '../models/AdminMessage.js';
import User from '../models/userModal.js';
import sendEmail from '../utils/emailService.js';

// Send a message/notification
export const sendMessage = async (req, res) => {
  try {
    const { recipientType, recipientDetail, message } = req.body;
    const sentBy = req.user._id;

    // Validate input
    if (!message || !recipientType) {
      return res.status(400).json({ message: 'Message and recipient type are required' });
    }

    // Get sender details for email
    const sender = await User.findById(sentBy).select('email fullName');
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Create and save message
    const newMessage = new AdminMessage({
      recipientType,
      recipientDetail: ['specific_actor', 'specific_student'].includes(recipientType) 
        ? recipientDetail 
        : undefined,
      message,
      sentBy
    });

    await newMessage.save();

    // Send email notification if applicable
    if (recipientType === 'specific_actor' || recipientType === 'specific_student') {
      try {
        await sendEmail({
          to: recipientDetail,
          subject: `New Message from ${sender.fullName}`,
          text: message,
          html: `
            <div>
              <h3>New Message from ${sender.fullName}</h3>
              <p>${message}</p>
              <p>Sent via School Budget Tracker System</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};

// Get all messages (admin view)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await AdminMessage.find()
      .populate({
        path: 'sentBy',
        select: 'email fullName role',
        model: User
      })
      .sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await AdminMessage.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
};

// Get messages for specific actor
export const getActorMessages = async (req, res) => {
  try {
    const actorEmail = req.user.email;
    const messages = await AdminMessage.find({
      $or: [
        { recipientType: 'actors' },
        { 
          recipientType: 'specific_actor',
          recipientDetail: actorEmail
        }
      ]
    })
    .populate({
      path: 'sentBy',
      select: 'email fullName role',
      model: User
    })
    .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};
