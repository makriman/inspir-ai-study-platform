// ============================================================================
// Authentication Routes
// ============================================================================
// Routes for student and parent authentication
// ============================================================================

import express from 'express';
import authController from '../controllers/authController.js';
import { authenticateStudent, authenticateParent } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============================================================================
// STUDENT AUTHENTICATION ROUTES
// ============================================================================

// Student login (username + password)
router.post('/student/login', authController.studentLogin);

// Student change password (requires authentication)
router.post('/student/change-password', authenticateStudent, authController.studentChangePassword);

// ============================================================================
// PARENT AUTHENTICATION ROUTES
// ============================================================================

// Parent signup (email + password)
router.post('/parent/signup', authController.parentSignup);

// Parent login (email + password)
router.post('/parent/login', authController.parentLogin);

// OAuth callback handler
router.post('/parent/oauth-callback', authController.oauthCallback);

// Email verification
router.get('/parent/verify-email/:token', authController.verifyEmail);

// Password reset (request)
router.post('/parent/request-password-reset', authController.requestPasswordReset);

// Password reset (reset with token)
router.post('/parent/reset-password', authController.resetPassword);

// Phone verification - send code
router.post('/parent/send-verification-code', authenticateParent, authController.sendPhoneVerificationCode);

// Phone verification - verify code
router.post('/parent/verify-phone', authenticateParent, authController.verifyPhone);

// ============================================================================
// EXPORTS
// ============================================================================

export default router;
