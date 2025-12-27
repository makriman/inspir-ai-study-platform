// ============================================================================
// Parent Controller
// ============================================================================
// Handles parent account operations: profile, dashboard, billing overview
// ============================================================================

import bcrypt from 'bcrypt';
import { supabase } from '../utils/supabaseClient.js';
import dotenv from 'dotenv';

dotenv.config();

const BCRYPT_SALT_ROUNDS = 10;

// ============================================================================
// PARENT ACCOUNT OPERATIONS
// ============================================================================

/**
 * Get Parent Profile
 * GET /api/parent/profile
 * Requires: Parent authentication
 */
export const getProfile = async (req, res) => {
    try {
        const parent_id = req.parent_id;

        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('id, email, account_type, institution_name, institution_type, institution_country, email_verified, phone_number, phone_verified, subscription_status, subscription_tier, student_limit, trial_start_date, trial_end_date, subscription_start_date, subscription_end_date, created_at')
            .eq('id', parent_id)
            .single();

        if (error || !parent) {
            return res.status(404).json({
                error: 'Parent not found',
                message: 'Parent account does not exist'
            });
        }

        res.json({
            success: true,
            parent
        });
    } catch (error) {
        console.error('Error in getProfile:', error);
        res.status(500).json({
            error: 'Failed to fetch profile',
            message: 'An error occurred while fetching profile'
        });
    }
};

/**
 * Update Parent Profile
 * PATCH /api/parent/profile
 * Body: { institution_name?, institution_type?, institution_country? }
 * Requires: Parent authentication
 */
export const updateProfile = async (req, res) => {
    try {
        const parent_id = req.parent_id;
        const {
            institution_name,
            institution_type,
            institution_country
        } = req.body;

        // Build update object
        const updateData = {};

        if (institution_name !== undefined) {
            updateData.institution_name = institution_name;
        }

        if (institution_type !== undefined) {
            updateData.institution_type = institution_type;
        }

        if (institution_country !== undefined) {
            updateData.institution_country = institution_country;
        }

        // Update parent
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .update(updateData)
            .eq('id', parent_id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        // Remove sensitive data
        delete parent.password_hash;

        res.json({
            success: true,
            message: 'Profile updated successfully',
            parent
        });
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({
            error: 'Update failed',
            message: 'An error occurred while updating profile'
        });
    }
};

/**
 * Change Parent Password
 * POST /api/parent/change-password
 * Body: { current_password, new_password }
 * Requires: Parent authentication
 */
export const changePassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;
        const parent_id = req.parent_id;

        // Validation
        if (!current_password || !new_password) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Current password and new password are required'
            });
        }

        if (new_password.length < 8) {
            return res.status(400).json({
                error: 'Weak password',
                message: 'Password must be at least 8 characters long'
            });
        }

        // Fetch parent
        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('password_hash')
            .eq('id', parent_id)
            .single();

        if (error || !parent) {
            return res.status(404).json({
                error: 'Parent not found',
                message: 'Parent account does not exist'
            });
        }

        // If OAuth-only account
        if (!parent.password_hash) {
            return res.status(400).json({
                error: 'OAuth account',
                message: 'This account uses OAuth login. Password change is not available.'
            });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(current_password, parent.password_hash);

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
            .from('parent_accounts')
            .update({
                password_hash: newPasswordHash
            })
            .eq('id', parent_id);

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Error in changePassword:', error);
        res.status(500).json({
            error: 'Password change failed',
            message: 'An error occurred while changing password'
        });
    }
};

// ============================================================================
// DASHBOARD & ANALYTICS
// ============================================================================

/**
 * Get Dashboard Overview
 * GET /api/parent/dashboard
 * Requires: Parent authentication
 */
export const getDashboard = async (req, res) => {
    try {
        const parent_id = req.parent_id;

        // Get parent info
        const { data: parent, error: parentError } = await supabase
            .from('parent_accounts')
            .select('subscription_status, subscription_tier, student_limit, trial_end_date')
            .eq('id', parent_id)
            .single();

        if (parentError || !parent) {
            return res.status(404).json({
                error: 'Parent not found',
                message: 'Parent account does not exist'
            });
        }

        // Count students
        const { data: students, error: studentsError } = await supabase
            .from('student_accounts')
            .select('id, username, display_name, avatar_url, total_messages, last_active_at, is_active')
            .eq('parent_id', parent_id)
            .order('created_at', { ascending: false });

        const totalStudents = students ? students.length : 0;
        const activeStudents = students ? students.filter(s => s.is_active).length : 0;

        // Calculate total messages across all students
        const totalMessages = students
            ? students.reduce((sum, student) => sum + (student.total_messages || 0), 0)
            : 0;

        // Calculate days remaining in trial
        let daysRemainingInTrial = null;
        if (parent.subscription_status === 'trial' && parent.trial_end_date) {
            const now = new Date();
            const trialEnd = new Date(parent.trial_end_date);
            const diffTime = trialEnd - now;
            daysRemainingInTrial = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        res.json({
            success: true,
            dashboard: {
                subscription: {
                    status: parent.subscription_status,
                    tier: parent.subscription_tier,
                    student_limit: parent.student_limit,
                    trial_end_date: parent.trial_end_date,
                    days_remaining_in_trial: daysRemainingInTrial
                },
                students: {
                    total: totalStudents,
                    active: activeStudents,
                    list: students || []
                },
                usage: {
                    total_messages: totalMessages
                }
            }
        });
    } catch (error) {
        console.error('Error in getDashboard:', error);
        res.status(500).json({
            error: 'Failed to fetch dashboard',
            message: 'An error occurred while fetching dashboard data'
        });
    }
};

/**
 * Get Subscription Info
 * GET /api/parent/subscription
 * Requires: Parent authentication
 */
export const getSubscription = async (req, res) => {
    try {
        const parent_id = req.parent_id;

        const { data: parent, error } = await supabase
            .from('parent_accounts')
            .select('subscription_status, subscription_tier, student_limit, trial_start_date, trial_end_date, subscription_start_date, subscription_end_date, stripe_customer_id')
            .eq('id', parent_id)
            .single();

        if (error || !parent) {
            return res.status(404).json({
                error: 'Parent not found',
                message: 'Parent account does not exist'
            });
        }

        // Calculate days remaining
        let daysRemaining = null;
        if (parent.subscription_status === 'trial' && parent.trial_end_date) {
            const now = new Date();
            const endDate = new Date(parent.trial_end_date);
            const diffTime = endDate - now;
            daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        } else if (parent.subscription_end_date) {
            const now = new Date();
            const endDate = new Date(parent.subscription_end_date);
            const diffTime = endDate - now;
            daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        res.json({
            success: true,
            subscription: {
                status: parent.subscription_status,
                tier: parent.subscription_tier,
                student_limit: parent.student_limit,
                trial_start_date: parent.trial_start_date,
                trial_end_date: parent.trial_end_date,
                subscription_start_date: parent.subscription_start_date,
                subscription_end_date: parent.subscription_end_date,
                days_remaining: daysRemaining,
                has_payment_method: !!parent.stripe_customer_id
            }
        });
    } catch (error) {
        console.error('Error in getSubscription:', error);
        res.status(500).json({
            error: 'Failed to fetch subscription',
            message: 'An error occurred while fetching subscription info'
        });
    }
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
    // Profile operations
    getProfile,
    updateProfile,
    changePassword,

    // Dashboard & Analytics
    getDashboard,
    getSubscription
};
