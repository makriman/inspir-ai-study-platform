// ============================================================================
// Authentication Controller
// ============================================================================
// Handles all authentication operations for students and parents
// Includes: login, signup, OAuth, email/phone verification, password reset
// ============================================================================

import bcrypt from 'bcrypt';
import { supabase } from '../utils/supabaseClient.js';
import {
    generateStudentToken,
    generateParentToken,
    generatePasswordResetToken,
    generateEmailVerificationToken
} from '../utils/jwt.js';
import dotenv from 'dotenv';

dotenv.config();

// Constants
const BCRYPT_SALT_ROUNDS = 10;
const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const ACCOUNT_LOCK_DURATION_MINUTES = 30;
const PASSWORD_RESET_TOKEN_EXPIRY_HOURS = 1;
const EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS = 24;

// ============================================================================
// STUDENT AUTHENTICATION
// ============================================================================

/**
 * Student Login
 * POST /api/auth/student/login
 * Body: { username, password }
 */
export const studentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Username and password are required'
            });
        }

        // Fetch student by username
        const { data: student, error } = await supabase
            .from('student_accounts')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !student) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'Username or password is incorrect'
            });
        }

        // Check if account is active
        if (!student.is_active) {
            return res.status(403).json({
                error: 'Account inactive',
                message: 'This student account has been deactivated. Please contact your parent/guardian.'
            });
        }

        // Check if account is locked
        if (student.account_locked) {
            const now = new Date();
            const lockedUntil = student.account_locked_until ? new Date(student.account_locked_until) : null;

            if (!lockedUntil || now < lockedUntil) {
                return res.status(403).json({
                    error: 'Account locked',
                    message: 'This account has been locked due to multiple failed login attempts. Please contact your parent/guardian.'
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
            student.failed_login_attempts = 0;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, student.password_hash);

        if (!isPasswordValid) {
            // Increment failed login attempts
            const newFailedAttempts = (student.failed_login_attempts || 0) + 1;
            const updateData = {
                failed_login_attempts: newFailedAttempts
            };

            // Lock account if max attempts reached
            if (newFailedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
                const lockUntil = new Date();
                lockUntil.setMinutes(lockUntil.getMinutes() + ACCOUNT_LOCK_DURATION_MINUTES);

                updateData.account_locked = true;
                updateData.account_locked_until = lockUntil.toISOString();
            }

            await supabase
                .from('student_accounts')
                .update(updateData)
                .eq('id', student.id);

            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'Username or password is incorrect',
                attempts_remaining: MAX_FAILED_LOGIN_ATTEMPTS - newFailedAttempts
            });
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

        // Password is correct, reset failed attempts and update last login
        await supabase
            .from('student_accounts')
            .update({
                failed_login_attempts: 0,
                last_login_at: new Date().toISOString()
            })
            .eq('id', student.id);

        // Generate JWT token
        const token = generateStudentToken(student);

        // Return success response
        res.json({
            success: true,
            message: 'Login successful',
            token,
            student: {
                id: student.id,
                username: student.username,
                display_name: student.display_name,
                avatar_url: student.avatar_url,
                age_group: student.age_group,
                study_level: student.study_level,
                must_change_password: student.must_change_password
            }
        });
    } catch (error) {
        console.error('Error in studentLogin:', error);
        res.status(500).json({
            error: 'Login failed',
            message: 'An error occurred during login'
        });
    }
};

/**
 * Student Change Password
 * POST /api/auth/student/change-password
 * Body: { current_password, new_password }
 * Requires: Student authentication
 */
export const studentChangePassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;
        const student_id = req.student_id;

        // Validation
        if (!current_password || !new_password) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Current password and new password are required'
            });
        }

        if (new_password.length < 6) {
            return res.status(400).json({
                error: 'Invalid password',
                message: 'Password must be at least 6 characters long'
            });
        }

        // Fetch student
        const { data: student, error } = await supabase
            .from('student_accounts')
            .select('password_hash')
            .eq('id', student_id)
            .single();

        if (error || !student) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student account does not exist'
            });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(current_password, student.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid password',
                message: 'Current password is incorrect'
            });
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(new_password, BCRYPT_SALT_ROUNDS);

        // Update password
        await supabase
            .from('student_accounts')
            .update({
                password_hash: newPasswordHash,
                must_change_password: false
            })
            .eq('id', student_id);

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Error in studentChangePassword:', error);
        res.status(500).json({
            error: 'Password change failed',
            message: 'An error occurred while changing password'
        });
    }
};

// ============================================================================
// PARENT AUTHENTICATION
// ============================================================================

/**
 * Parent Signup
 * POST /api/auth/parent/signup
 * Body: { email, password, account_type, institution_name?, institution_type?, institution_country? }
 */
export const parentSignup = async (req, res) => {
    try {
        const {
            email,
            password,
            account_type = 'parent',
            institution_name,
            institution_type,
            institution_country
        } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Email and password are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email',
                message: 'Please provide a valid email address'
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                error: 'Weak password',
                message: 'Password must be at least 8 characters long'
            });
        }

        // Validate account type
        const validAccountTypes = ['parent', 'school', 'organization', 'company'];
        if (!validAccountTypes.includes(account_type)) {
            return res.status(400).json({
                error: 'Invalid account type',
                message: 'Account type must be one of: parent, school, organization, company'
            });
        }

        // Check if email already exists
        const { data: existing, error: existingError } = await supabase
            .from('parent_accounts')
            .select('id')
            .eq('email', email)
            .single();

        if (existing) {
            return res.status(409).json({
                error: 'Email already exists',
                message: 'An account with this email already exists'
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        // Generate email verification token
        const emailVerificationToken = generateEmailVerificationToken();

        // Create parent account
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .insert([
                {
                    email,
                    password_hash: passwordHash,
                    account_type,
                    institution_name,
                    institution_type,
                    institution_country,
                    email_verified: false, // Will be true after email verification
                    email_verification_token: emailVerificationToken,
                    subscription_status: 'trial',
                    student_limit: 1, // 1 student during trial
                    trial_start_date: new Date().toISOString(),
                    trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days from now
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating parent account:', error);
            throw error;
        }

        // TODO: Send verification email
        // For now, we'll just log the token (in production, this should send an email)
        console.log(`Email verification token for ${email}: ${emailVerificationToken}`);
        console.log(`Verification URL: ${process.env.FRONTEND_URL || 'https://inspir.uk'}/verify-email/${emailVerificationToken}`);

        // Generate JWT token (even though email is not verified, for convenience)
        const token = generateParentToken(parent);

        res.status(201).json({
            success: true,
            message: 'Account created successfully. Please check your email for verification link.',
            token,
            parent: {
                id: parent.id,
                email: parent.email,
                account_type: parent.account_type,
                email_verified: parent.email_verified,
                subscription_status: parent.subscription_status,
                trial_end_date: parent.trial_end_date
            },
            verification_required: true
        });
    } catch (error) {
        console.error('Error in parentSignup:', error);
        res.status(500).json({
            error: 'Signup failed',
            message: 'An error occurred during signup'
        });
    }
};

/**
 * Parent Login
 * POST /api/auth/parent/login
 * Body: { email, password }
 */
export const parentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Email and password are required'
            });
        }

        // Fetch parent by email
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !parent) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'Email or password is incorrect'
            });
        }

        // Check if account is locked
        if (parent.account_locked) {
            const now = new Date();
            const lockedUntil = parent.account_locked_until ? new Date(parent.account_locked_until) : null;

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
            parent.failed_login_attempts = 0;
        }

        // If this is an OAuth-only account (no password hash), reject
        if (!parent.password_hash) {
            return res.status(400).json({
                error: 'OAuth account',
                message: 'This account uses OAuth login (Google/Apple/Microsoft). Please use the appropriate login button.'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, parent.password_hash);

        if (!isPasswordValid) {
            // Increment failed login attempts
            const newFailedAttempts = (parent.failed_login_attempts || 0) + 1;
            const updateData = {
                failed_login_attempts: newFailedAttempts
            };

            // Lock account if max attempts reached
            if (newFailedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
                const lockUntil = new Date();
                lockUntil.setMinutes(lockUntil.getMinutes() + ACCOUNT_LOCK_DURATION_MINUTES);

                updateData.account_locked = true;
                updateData.account_locked_until = lockUntil.toISOString();
            }

            await supabase
                .from('parent_accounts')
                .update(updateData)
                .eq('id', parent.id);

            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'Email or password is incorrect',
                attempts_remaining: MAX_FAILED_LOGIN_ATTEMPTS - newFailedAttempts
            });
        }

        // Password is correct, reset failed attempts and update last login
        const ip = req.ip || req.connection.remoteAddress;

        await supabase
            .from('parent_accounts')
            .update({
                failed_login_attempts: 0,
                last_login_at: new Date().toISOString(),
                last_login_ip: ip
            })
            .eq('id', parent.id);

        // Generate JWT token
        const token = generateParentToken(parent);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            parent: {
                id: parent.id,
                email: parent.email,
                account_type: parent.account_type,
                email_verified: parent.email_verified,
                phone_verified: parent.phone_verified,
                subscription_status: parent.subscription_status,
                student_limit: parent.student_limit,
                trial_end_date: parent.trial_end_date
            }
        });
    } catch (error) {
        console.error('Error in parentLogin:', error);
        res.status(500).json({
            error: 'Login failed',
            message: 'An error occurred during login'
        });
    }
};

/**
 * OAuth Callback Handler
 * POST /api/auth/parent/oauth-callback
 * Body: { provider, oauth_id, email, name }
 */
export const oauthCallback = async (req, res) => {
    try {
        const { provider, oauth_id, email, name } = req.body;

        // Validation
        if (!provider || !oauth_id || !email) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Provider, OAuth ID, and email are required'
            });
        }

        const validProviders = ['google', 'apple', 'microsoft'];
        if (!validProviders.includes(provider)) {
            return res.status(400).json({
                error: 'Invalid provider',
                message: 'Provider must be one of: google, apple, microsoft'
            });
        }

        // Check if account exists with this OAuth ID
        const oauthField = `${provider}_id`;
        const { data: existing, error: existingError } = await supabase
            .from('parent_accounts')
            .select('*')
            .eq(oauthField, oauth_id)
            .single();

        let parent;

        if (existing) {
            // Account exists, log them in
            parent = existing;

            // Update last login
            const ip = req.ip || req.connection.remoteAddress;
            await supabase
                .from('parent_accounts')
                .update({
                    last_login_at: new Date().toISOString(),
                    last_login_ip: ip
                })
                .eq('id', parent.id);
        } else {
            // Create new account
            const accountData = {
                email,
                oauth_provider: provider,
                [oauthField]: oauth_id,
                email_verified: true, // OAuth emails are pre-verified
                account_type: 'parent',
                subscription_status: 'trial',
                student_limit: 1,
                trial_start_date: new Date().toISOString(),
                trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
            };

            const { data: newParent, error: createError } = await supabase
                .from('parent_accounts')
                .insert([accountData])
                .select()
                .single();

            if (createError) {
                console.error('Error creating OAuth parent account:', createError);
                throw createError;
            }

            parent = newParent;
        }

        // Generate JWT token
        const token = generateParentToken(parent);

        res.json({
            success: true,
            message: 'OAuth login successful',
            token,
            parent: {
                id: parent.id,
                email: parent.email,
                account_type: parent.account_type,
                email_verified: parent.email_verified,
                subscription_status: parent.subscription_status,
                trial_end_date: parent.trial_end_date
            }
        });
    } catch (error) {
        console.error('Error in oauthCallback:', error);
        res.status(500).json({
            error: 'OAuth login failed',
            message: 'An error occurred during OAuth login'
        });
    }
};

// ============================================================================
// EMAIL VERIFICATION
// ============================================================================

/**
 * Verify Email
 * GET /api/auth/parent/verify-email/:token
 */
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({
                error: 'Missing token',
                message: 'Email verification token is required'
            });
        }

        // Find parent with this verification token
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('*')
            .eq('email_verification_token', token)
            .single();

        if (error || !parent) {
            return res.status(400).json({
                error: 'Invalid token',
                message: 'Email verification token is invalid or has expired'
            });
        }

        // Check if already verified
        if (parent.email_verified) {
            return res.json({
                success: true,
                message: 'Email is already verified',
                already_verified: true
            });
        }

        // Mark email as verified
        await supabase
            .from('parent_accounts')
            .update({
                email_verified: true,
                email_verified_at: new Date().toISOString(),
                email_verification_token: null // Clear the token
            })
            .eq('id', parent.id);

        res.json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        console.error('Error in verifyEmail:', error);
        res.status(500).json({
            error: 'Verification failed',
            message: 'An error occurred during email verification'
        });
    }
};

// ============================================================================
// PASSWORD RESET
// ============================================================================

/**
 * Request Password Reset
 * POST /api/auth/parent/request-password-reset
 * Body: { email }
 */
export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: 'Missing email',
                message: 'Email is required'
            });
        }

        // Find parent by email
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('id, email')
            .eq('email', email)
            .single();

        // Always return success (don't leak whether email exists)
        if (error || !parent) {
            return res.json({
                success: true,
                message: 'If an account exists with this email, a password reset link will be sent'
            });
        }

        // Generate password reset token
        const resetToken = generatePasswordResetToken();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + PASSWORD_RESET_TOKEN_EXPIRY_HOURS);

        // Store token in database
        await supabase
            .from('password_reset_tokens')
            .insert([
                {
                    parent_id: parent.id,
                    token: resetToken,
                    expires_at: expiresAt.toISOString()
                }
            ]);

        // TODO: Send password reset email
        console.log(`Password reset token for ${email}: ${resetToken}`);
        console.log(`Reset URL: ${process.env.FRONTEND_URL || 'https://inspir.uk'}/reset-password/${resetToken}`);

        res.json({
            success: true,
            message: 'If an account exists with this email, a password reset link will be sent'
        });
    } catch (error) {
        console.error('Error in requestPasswordReset:', error);
        res.status(500).json({
            error: 'Request failed',
            message: 'An error occurred while processing your request'
        });
    }
};

/**
 * Reset Password
 * POST /api/auth/parent/reset-password
 * Body: { token, new_password }
 */
export const resetPassword = async (req, res) => {
    try {
        const { token, new_password } = req.body;

        if (!token || !new_password) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Token and new password are required'
            });
        }

        if (new_password.length < 8) {
            return res.status(400).json({
                error: 'Weak password',
                message: 'Password must be at least 8 characters long'
            });
        }

        // Find and validate reset token
        const { data: resetTokenData, error: tokenError } = await supabase
            .from('password_reset_tokens')
            .select('*')
            .eq('token', token)
            .eq('used', false)
            .single();

        if (tokenError || !resetTokenData) {
            return res.status(400).json({
                error: 'Invalid token',
                message: 'Password reset token is invalid or has been used'
            });
        }

        // Check if token is expired
        const now = new Date();
        const expiresAt = new Date(resetTokenData.expires_at);

        if (now > expiresAt) {
            return res.status(400).json({
                error: 'Token expired',
                message: 'Password reset token has expired. Please request a new one.'
            });
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(new_password, BCRYPT_SALT_ROUNDS);

        // Update parent password
        await supabase
            .from('parent_accounts')
            .update({
                password_hash: newPasswordHash,
                account_locked: false, // Unlock account if it was locked
                failed_login_attempts: 0
            })
            .eq('id', resetTokenData.parent_id);

        // Mark token as used
        await supabase
            .from('password_reset_tokens')
            .update({ used: true })
            .eq('id', resetTokenData.id);

        res.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({
            error: 'Password reset failed',
            message: 'An error occurred while resetting password'
        });
    }
};

// ============================================================================
// PHONE VERIFICATION (Supabase built-in)
// ============================================================================

/**
 * Send Phone Verification Code
 * POST /api/auth/parent/send-verification-code
 * Body: { phone_number }
 * Requires: Parent authentication
 */
export const sendPhoneVerificationCode = async (req, res) => {
    try {
        const { phone_number } = req.body;
        const parent_id = req.parent_id;

        if (!phone_number) {
            return res.status(400).json({
                error: 'Missing phone number',
                message: 'Phone number is required'
            });
        }

        // Generate 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes expiry

        // Store code in database
        await supabase
            .from('parent_accounts')
            .update({
                phone_number,
                phone_verification_code: verificationCode,
                phone_verification_expires_at: expiresAt.toISOString()
            })
            .eq('id', parent_id);

        // TODO: Send SMS using Supabase Phone Auth
        // For now, just log it (in production, use Supabase's supabase.auth.signInWithOtp)
        console.log(`Phone verification code for ${phone_number}: ${verificationCode}`);

        res.json({
            success: true,
            message: 'Verification code sent to your phone'
        });
    } catch (error) {
        console.error('Error in sendPhoneVerificationCode:', error);
        res.status(500).json({
            error: 'Failed to send code',
            message: 'An error occurred while sending verification code'
        });
    }
};

/**
 * Verify Phone
 * POST /api/auth/parent/verify-phone
 * Body: { code }
 * Requires: Parent authentication
 */
export const verifyPhone = async (req, res) => {
    try {
        const { code } = req.body;
        const parent_id = req.parent_id;

        if (!code) {
            return res.status(400).json({
                error: 'Missing code',
                message: 'Verification code is required'
            });
        }

        // Fetch parent
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('phone_verification_code, phone_verification_expires_at')
            .eq('id', parent_id)
            .single();

        if (error || !parent) {
            return res.status(404).json({
                error: 'Parent not found',
                message: 'Parent account does not exist'
            });
        }

        // Check if code matches
        if (parent.phone_verification_code !== code) {
            return res.status(400).json({
                error: 'Invalid code',
                message: 'Verification code is incorrect'
            });
        }

        // Check if code is expired
        const now = new Date();
        const expiresAt = new Date(parent.phone_verification_expires_at);

        if (now > expiresAt) {
            return res.status(400).json({
                error: 'Code expired',
                message: 'Verification code has expired. Please request a new one.'
            });
        }

        // Mark phone as verified
        await supabase
            .from('parent_accounts')
            .update({
                phone_verified: true,
                phone_verified_at: new Date().toISOString(),
                phone_verification_code: null // Clear the code
            })
            .eq('id', parent_id);

        res.json({
            success: true,
            message: 'Phone verified successfully'
        });
    } catch (error) {
        console.error('Error in verifyPhone:', error);
        res.status(500).json({
            error: 'Verification failed',
            message: 'An error occurred during phone verification'
        });
    }
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
    // Student authentication
    studentLogin,
    studentChangePassword,

    // Parent authentication
    parentSignup,
    parentLogin,
    oauthCallback,

    // Email verification
    verifyEmail,

    // Password reset
    requestPasswordReset,
    resetPassword,

    // Phone verification
    sendPhoneVerificationCode,
    verifyPhone
};
