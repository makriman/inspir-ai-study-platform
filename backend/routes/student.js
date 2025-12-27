// ============================================================================
// Student Management Routes
// ============================================================================
// Routes for managing student accounts (parent operations)
// ============================================================================

import express from 'express';
import studentController from '../controllers/studentController.js';
import { authenticateParent } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require parent authentication

// ============================================================================
// STUDENT CRUD OPERATIONS
// ============================================================================

// Create new student
router.post('/', authenticateParent, studentController.createStudent);

// Get all students for this parent
router.get('/', authenticateParent, studentController.getStudents);

// Get single student
router.get('/:id', authenticateParent, studentController.getStudent);

// Update student
router.patch('/:id', authenticateParent, studentController.updateStudent);

// Delete student
router.delete('/:id', authenticateParent, studentController.deleteStudent);

// ============================================================================
// STUDENT PASSWORD MANAGEMENT
// ============================================================================

// Reset student password
router.post('/:id/reset-password', authenticateParent, studentController.resetStudentPassword);

// ============================================================================
// STUDENT USAGE & ANALYTICS
// ============================================================================

// Get student usage stats
router.get('/:id/usage', authenticateParent, studentController.getStudentUsage);

// Get student conversations (for monitoring)
router.get('/:id/conversations', authenticateParent, studentController.getStudentConversations);

// Get student conversation messages (for monitoring)
router.get('/:studentId/conversations/:conversationId/messages', authenticateParent, studentController.getStudentConversationMessages);

// ============================================================================
// EXPORTS
// ============================================================================

export default router;
