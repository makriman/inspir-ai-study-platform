// ============================================================================
// Authentication Middleware
// ============================================================================
// Handles authentication for both students and parents
// Supports BOTH legacy session-based auth AND new JWT-based auth
// This ensures backward compatibility during migration
// ============================================================================

import { verifyStudentToken, verifyParentToken, extractTokenFromRequest } from '../utils/jwt.js';
import { supabase } from '../utils/supabaseClient.js';

// ============================================================================
// Session ID Helper (Legacy Support)
// ============================================================================

/**
 * Generate session ID from request (IP-based for backward compatibility)
 * @param {Object} req - Express request object
 * @returns {string} Session ID
 */
export const getSessionId = (req) => {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';
    return `session_${Buffer.from(ip + userAgent).toString('base64').slice(0, 32)}`;
};

// ============================================================================
// Student Authentication Middleware
// ============================================================================

/**
 * Authenticate student via JWT token
 * Requires valid JWT token in Authorization header
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const authenticateStudent = async (req, res, next) => {
    try {
        // Extract token from request
        const token = extractTokenFromRequest(req);

        if (!token) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'No authentication token provided'
            });
        }

        // Verify student token
        const studentData = verifyStudentToken(token);

        if (!studentData) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'Authentication token is invalid or expired'
            });
        }

        // Fetch full student account from database to verify it exists and is active
        const { data: student, error } = await supabase
            .from('student_accounts')
            .select('*')
            .eq('id', studentData.student_id)
            .single();

        if (error || !student) {
            return res.status(401).json({
                error: 'Student not found',
                message: 'Student account does not exist'
            });
        }

        // Check if account is active
        if (!student.is_active) {
            return res.status(403).json({
                error: 'Account inactive',
                message: 'This student account has been deactivated'
            });
        }

        // Check if account is locked
        if (student.account_locked) {
            const now = new Date();
            const lockedUntil = student.account_locked_until ? new Date(student.account_locked_until) : null;

            // If locked indefinitely or still within lock period
            if (!lockedUntil || now < lockedUntil) {
                return res.status(403).json({
                    error: 'Account locked',
                    message: 'This account has been locked. Please contact your parent/guardian.'
                });
            }

            // Lock period expired, unlock the account
            await supabase
                .from('student_accounts')
                .update({
                    account_locked: false,
                    failed_login_attempts: 0,
                    account_locked_until: null
                })
                .eq('id', student.id);

            student.account_locked = false;
        }

        // Check parent subscription status
        const { data: parent, error: parentError } = await supabase
            .from('parent_accounts')
            .select('subscription_status, trial_end_date')
            .eq('id', student.parent_id)
            .single();

        if (parentError || !parent) {
            return res.status(403).json({
                error: 'Parent account not found',
                message: 'Associated parent account does not exist'
            });
        }

        // Check if subscription is expired or canceled
        if (parent.subscription_status === 'expired' || parent.subscription_status === 'canceled') {
            return res.status(403).json({
                error: 'Subscription expired',
                message: 'Your subscription has expired. Please ask your parent/guardian to renew.'
            });
        }

        // Attach student data to request object
        req.student = student;
        req.student_id = student.id;
        req.parent_id = student.parent_id;
        req.account_type = 'student';

        next();
    } catch (error) {
        console.error('Error in authenticateStudent middleware:', error);
        return res.status(500).json({
            error: 'Authentication failed',
            message: 'An error occurred during authentication'
        });
    }
};

// ============================================================================
// Parent Authentication Middleware
// ============================================================================

/**
 * Authenticate parent via JWT token
 * Requires valid JWT token in Authorization header
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const authenticateParent = async (req, res, next) => {
    try {
        // Extract token from request
        const token = extractTokenFromRequest(req);

        if (!token) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'No authentication token provided'
            });
        }

        // Verify parent token
        const parentData = verifyParentToken(token);

        if (!parentData) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'Authentication token is invalid or expired'
            });
        }

        // Fetch full parent account from database
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('*')
            .eq('id', parentData.parent_id)
            .single();

        if (error || !parent) {
            return res.status(401).json({
                error: 'Parent not found',
                message: 'Parent account does not exist'
            });
        }

        // Check if account is locked
        if (parent.account_locked) {
            const now = new Date();
            const lockedUntil = parent.account_locked_until ? new Date(parent.account_locked_until) : null;

            // If locked indefinitely or still within lock period
            if (!lockedUntil || now < lockedUntil) {
                return res.status(403).json({
                    error: 'Account locked',
                    message: 'This account has been locked due to multiple failed login attempts. Please try again later or reset your password.'
                });
            }

            // Lock period expired, unlock the account
            await supabase
                .from('parent_accounts')
                .update({
                    account_locked: false,
                    failed_login_attempts: 0,
                    account_locked_until: null
                })
                .eq('id', parent.id);

            parent.account_locked = false;
        }

        // Attach parent data to request object
        req.parent = parent;
        req.parent_id = parent.id;
        req.account_type = parent.account_type || 'parent';

        next();
    } catch (error) {
        console.error('Error in authenticateParent middleware:', error);
        return res.status(500).json({
            error: 'Authentication failed',
            message: 'An error occurred during authentication'
        });
    }
};

// ============================================================================
// Optional Authentication Middleware (Supports Legacy + New Auth)
// ============================================================================

/**
 * Optional authentication middleware
 * Supports BOTH session-based (legacy) AND JWT-based (new) authentication
 * This allows for backward compatibility during migration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const optionalAuth = async (req, res, next) => {
    try {
        // Try JWT authentication first
        const token = extractTokenFromRequest(req);

        if (token) {
            // Try student token
            const studentData = verifyStudentToken(token);

            if (studentData) {
                // Fetch student account
                const { data: student, error } = await supabase
                    .from('student_accounts')
                    .select('*')
                    .eq('id', studentData.student_id)
                    .single();

                if (!error && student && student.is_active && !student.account_locked) {
                    req.student = student;
                    req.student_id = student.id;
                    req.parent_id = student.parent_id;
                    req.account_type = 'student';
                    req.auth_type = 'jwt';
                    return next();
                }
            }

            // Try parent token
            const parentData = verifyParentToken(token);

            if (parentData) {
                // Fetch parent account
                const { data: parent, error } = await supabase
                    .from('parent_accounts')
                    .select('*')
                    .eq('id', parentData.parent_id)
                    .single();

                if (!error && parent && !parent.account_locked) {
                    req.parent = parent;
                    req.parent_id = parent.id;
                    req.account_type = parent.account_type || 'parent';
                    req.auth_type = 'jwt';
                    return next();
                }
            }
        }

        // Fallback to session-based auth (legacy)
        const sessionId = getSessionId(req);
        req.session_id = sessionId;
        req.auth_type = 'session';

        next();
    } catch (error) {
        console.error('Error in optionalAuth middleware:', error);

        // On error, fall back to session-based auth
        const sessionId = getSessionId(req);
        req.session_id = sessionId;
        req.auth_type = 'session';

        next();
    }
};

// ============================================================================
// Authorization Helpers
// ============================================================================

/**
 * Check if user is authenticated (either student or parent)
 * @param {Object} req - Express request object
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = (req) => {
    return !!(req.student_id || req.parent_id || req.session_id);
};

/**
 * Check if user is a student
 * @param {Object} req - Express request object
 * @returns {boolean} True if student
 */
export const isStudent = (req) => {
    return req.account_type === 'student' && !!req.student_id;
};

/**
 * Check if user is a parent
 * @param {Object} req - Express request object
 * @returns {boolean} True if parent
 */
export const isParent = (req) => {
    return ['parent', 'school', 'organization', 'company'].includes(req.account_type) && !!req.parent_id;
};

/**
 * Middleware: Require student authentication
 */
export const requireStudent = (req, res, next) => {
    if (!isStudent(req)) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'This action requires student authentication'
        });
    }
    next();
};

/**
 * Middleware: Require parent authentication
 */
export const requireParent = (req, res, next) => {
    if (!isParent(req)) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'This action requires parent authentication'
        });
    }
    next();
};

// ============================================================================
// Exports
// ============================================================================

export default {
    // Session helpers
    getSessionId,

    // Authentication middleware
    authenticateStudent,
    authenticateParent,
    optionalAuth,

    // Authorization helpers
    isAuthenticated,
    isStudent,
    isParent,
    requireStudent,
    requireParent
};
