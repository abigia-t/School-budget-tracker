import express from 'express';
import {
  sendMessage,
  getAllMessages,
  deleteMessage,
  getActorMessages
} from '../controllers/adminMessages.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Admin routes
router.post('/send', authenticate, authorize(['admin']), sendMessage);
router.get('/all', authenticate, authorize(['admin']), getAllMessages);
router.delete('/:id', authenticate, authorize(['admin']), deleteMessage);

// Actor-specific routes
router.get('/my-messages', authenticate, getActorMessages);

export default router;