// ============================================================================
// Parent Account Routes
// ============================================================================
// Routes for parent account management
// ============================================================================

import express from 'express';
import parentController from '../controllers/parentController.js';
import { authenticateParent } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require parent authentication

// ============================================================================
// PARENT PROFILE OPERATIONS
// ============================================================================

// Get parent profile
router.get('/profile', authenticateParent, parentController.getProfile);

// Update parent profile
router.patch('/profile', authenticateParent, parentController.updateProfile);

// Change password
router.post('/change-password', authenticateParent, parentController.changePassword);

// ============================================================================
// DASHBOARD & ANALYTICS
// ============================================================================

// Get dashboard overview
router.get('/dashboard', authenticateParent, parentController.getDashboard);

// Get subscription info
router.get('/subscription', authenticateParent, parentController.getSubscription);

// ============================================================================
// EXPORTS
// ============================================================================

export default router;
