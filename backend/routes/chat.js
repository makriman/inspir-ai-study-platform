import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  createConversation,
  getConversations,
  getMessages,
  sendMessage,
  updateConversation,
  deleteConversation,
  searchMessages
} from '../controllers/chatController.js';

const router = express.Router();

// Rate limiter for message sending (200 per hour)
const messageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 200,
  message: { error: 'Too many messages. Please wait before sending more.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Conversation routes
router.post('/conversations', createConversation);
router.get('/conversations', getConversations);
router.get('/conversations/:id', getMessages);
router.patch('/conversations/:id', updateConversation);
router.delete('/conversations/:id', deleteConversation);

// Message route (with rate limiting)
router.post('/conversations/:id/messages', messageLimiter, sendMessage);

// Search route
router.get('/search', searchMessages);

export default router;
