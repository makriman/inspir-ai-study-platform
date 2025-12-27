// ============================================================================
// Student Controller
// ============================================================================
// Handles CRUD operations for student accounts
// Only parents can create, update, and delete student accounts
// ============================================================================

import bcrypt from 'bcrypt';
import { supabase } from '../utils/supabaseClient.js';
import dotenv from 'dotenv';

dotenv.config();

const BCRYPT_SALT_ROUNDS = 10;

// ============================================================================
// STUDENT CRUD OPERATIONS
// ============================================================================

/**
 * Create Student
 * POST /api/students
 * Body: { username, password, display_name, birth_year?, study_level?, avatar_url? }
 * Requires: Parent authentication
 */
export const createStudent = async (req, res) => {
    try {
        const {
            username,
            password,
            display_name,
            birth_year,
            study_level,
            avatar_url
        } = req.body;
        const parent_id = req.parent_id;

        // Validation
        if (!username || !password || !display_name) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Username, password, and display name are required'
            });
        }

        // Validate username (no "inspir_" prefix, alphanumeric with underscores, 3-50 chars)
        const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                error: 'Invalid username',
                message: 'Username must be 3-50 characters, alphanumeric with underscores only'
            });
        }

        // Check for "inspir_" prefix (reserved)
        if (username.toLowerCase().startsWith('inspir_')) {
            return res.status(400).json({
                error: 'Reserved username',
                message: 'Usernames starting with "inspir_" are reserved. Please choose a different username.'
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                error: 'Weak password',
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if username already exists
        const { data: existing, error: existingError } = await supabase
            .from('student_accounts')
            .select('id')
            .eq('username', username)
            .single();

        if (existing) {
            return res.status(409).json({
                error: 'Username already exists',
                message: 'This username is already taken. Please choose a different one.'
            });
        }

        // Get parent's student limit and current count
        const { data: parent, error: parentError } = await supabase
            .from('parent_accounts')
            .select('student_limit, subscription_status')
            .eq('id', parent_id)
            .single();

        if (parentError || !parent) {
            return res.status(404).json({
                error: 'Parent not found',
                message: 'Parent account does not exist'
            });
        }

        // Check subscription status
        if (parent.subscription_status === 'expired' || parent.subscription_status === 'canceled') {
            return res.status(403).json({
                error: 'Subscription expired',
                message: 'Your subscription has expired. Please renew to create student profiles.'
            });
        }

        // Count current active students
        const { count, error: countError } = await supabase
            .from('student_accounts')
            .select('*', { count: 'exact', head: true })
            .eq('parent_id', parent_id)
            .eq('is_active', true);

        if (countError) {
            throw countError;
        }

        // Check if limit reached
        if (count >= parent.student_limit) {
            return res.status(403).json({
                error: 'Student limit reached',
                message: `You have reached your student limit (${parent.student_limit}). Please upgrade your subscription to add more students.`,
                current_count: count,
                limit: parent.student_limit
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        // Calculate age group from birth year
        let age_group = 'adult'; // default
        if (birth_year) {
            const currentYear = new Date().getFullYear();
            const age = currentYear - birth_year;
            if (age < 14) {
                age_group = 'under14';
            } else if (age >= 14 && age < 18) {
                age_group = 'teen';
            }
        }

        // Create student account
        const { data: student, error } = await supabase
            .from('student_accounts')
            .insert([
                {
                    parent_id,
                    username,
                    password_hash: passwordHash,
                    display_name,
                    birth_year,
                    age_group,
                    study_level,
                    avatar_url,
                    is_active: true,
                    must_change_password: false // Can be set to true if parent wants student to change password on first login
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating student:', error);
            throw error;
        }

        res.status(201).json({
            success: true,
            message: 'Student account created successfully',
            student: {
                id: student.id,
                username: student.username,
                display_name: student.display_name,
                avatar_url: student.avatar_url,
                age_group: student.age_group,
                study_level: student.study_level,
                is_active: student.is_active
            }
        });
    } catch (error) {
        console.error('Error in createStudent:', error);
        res.status(500).json({
            error: 'Student creation failed',
            message: 'An error occurred while creating student account'
        });
    }
};

/**
 * Get All Students
 * GET /api/students
 * Requires: Parent authentication
 */
export const getStudents = async (req, res) => {
    try {
        const parent_id = req.parent_id;

        // Fetch all students for this parent
        const { data: students, error } = await supabase
            .from('student_accounts')
            .select('id, username, display_name, avatar_url, age_group, study_level, is_active, total_messages, study_time_minutes, streak_days, last_active_at, created_at')
            .eq('parent_id', parent_id)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.json({
            success: true,
            students: students || []
        });
    } catch (error) {
        console.error('Error in getStudents:', error);
        res.status(500).json({
            error: 'Failed to fetch students',
            message: 'An error occurred while fetching students'
        });
    }
};

/**
 * Get Single Student
 * GET /api/students/:id
 * Requires: Parent authentication
 */
export const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const parent_id = req.parent_id;

        // Fetch student (ensure it belongs to this parent)
        const { data: student, error } = await supabase
            .from('student_accounts')
            .select('*')
            .eq('id', id)
            .eq('parent_id', parent_id)
            .single();

        if (error || !student) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student does not exist or does not belong to this parent account'
            });
        }

        // Remove sensitive data
        delete student.password_hash;
        delete student.metadata;

        res.json({
            success: true,
            student
        });
    } catch (error) {
        console.error('Error in getStudent:', error);
        res.status(500).json({
            error: 'Failed to fetch student',
            message: 'An error occurred while fetching student details'
        });
    }
};

/**
 * Update Student
 * PATCH /api/students/:id
 * Body: { display_name?, avatar_url?, birth_year?, study_level?, is_active? }
 * Requires: Parent authentication
 */
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const parent_id = req.parent_id;
        const {
            display_name,
            avatar_url,
            birth_year,
            study_level,
            is_active
        } = req.body;

        // Verify student belongs to this parent
        const { data: existing, error: existingError } = await supabase
            .from('student_accounts')
            .select('id')
            .eq('id', id)
            .eq('parent_id', parent_id)
            .single();

        if (existingError || !existing) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student does not exist or does not belong to this parent account'
            });
        }

        // Build update object (only include provided fields)
        const updateData = {};

        if (display_name !== undefined) {
            updateData.display_name = display_name;
        }

        if (avatar_url !== undefined) {
            updateData.avatar_url = avatar_url;
        }

        if (birth_year !== undefined) {
            updateData.birth_year = birth_year;

            // Recalculate age group
            const currentYear = new Date().getFullYear();
            const age = currentYear - birth_year;
            if (age < 14) {
                updateData.age_group = 'under14';
            } else if (age >= 14 && age < 18) {
                updateData.age_group = 'teen';
            } else {
                updateData.age_group = 'adult';
            }
        }

        if (study_level !== undefined) {
            updateData.study_level = study_level;
        }

        if (is_active !== undefined) {
            updateData.is_active = is_active;
        }

        // Update student
        const { data: student, error } = await supabase
            .from('student_accounts')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        // Remove sensitive data
        delete student.password_hash;

        res.json({
            success: true,
            message: 'Student updated successfully',
            student
        });
    } catch (error) {
        console.error('Error in updateStudent:', error);
        res.status(500).json({
            error: 'Update failed',
            message: 'An error occurred while updating student'
        });
    }
};

/**
 * Delete Student
 * DELETE /api/students/:id
 * Requires: Parent authentication
 */
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const parent_id = req.parent_id;

        // Verify student belongs to this parent
        const { data: existing, error: existingError } = await supabase
            .from('student_accounts')
            .select('id, username')
            .eq('id', id)
            .eq('parent_id', parent_id)
            .single();

        if (existingError || !existing) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student does not exist or does not belong to this parent account'
            });
        }

        // Delete student (cascade delete will remove conversations, messages, folders)
        const { error } = await supabase
            .from('student_accounts')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        res.json({
            success: true,
            message: 'Student deleted successfully',
            deleted_student_id: id
        });
    } catch (error) {
        console.error('Error in deleteStudent:', error);
        res.status(500).json({
            error: 'Delete failed',
            message: 'An error occurred while deleting student'
        });
    }
};

// ============================================================================
// STUDENT PASSWORD MANAGEMENT
// ============================================================================

/**
 * Reset Student Password
 * POST /api/students/:id/reset-password
 * Body: { new_password, must_change_password? }
 * Requires: Parent authentication
 */
export const resetStudentPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const parent_id = req.parent_id;
        const { new_password, must_change_password = false } = req.body;

        // Validation
        if (!new_password) {
            return res.status(400).json({
                error: 'Missing password',
                message: 'New password is required'
            });
        }

        if (new_password.length < 6) {
            return res.status(400).json({
                error: 'Weak password',
                message: 'Password must be at least 6 characters long'
            });
        }

        // Verify student belongs to this parent
        const { data: existing, error: existingError } = await supabase
            .from('student_accounts')
            .select('id')
            .eq('id', id)
            .eq('parent_id', parent_id)
            .single();

        if (existingError || !existing) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student does not exist or does not belong to this parent account'
            });
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(new_password, BCRYPT_SALT_ROUNDS);

        // Update password
        await supabase
            .from('student_accounts')
            .update({
                password_hash: newPasswordHash,
                must_change_password,
                account_locked: false, // Unlock if it was locked
                failed_login_attempts: 0
            })
            .eq('id', id);

        res.json({
            success: true,
            message: 'Student password reset successfully'
        });
    } catch (error) {
        console.error('Error in resetStudentPassword:', error);
        res.status(500).json({
            error: 'Password reset failed',
            message: 'An error occurred while resetting password'
        });
    }
};

// ============================================================================
// STUDENT USAGE & ANALYTICS
// ============================================================================

/**
 * Get Student Usage Stats
 * GET /api/students/:id/usage
 * Requires: Parent authentication
 */
export const getStudentUsage = async (req, res) => {
    try {
        const { id } = req.params;
        const parent_id = req.parent_id;

        // Verify student belongs to this parent
        const { data: student, error: studentError } = await supabase
            .from('student_accounts')
            .select('id, username, display_name, total_messages, study_time_minutes, streak_days, last_active_at, created_at')
            .eq('id', id)
            .eq('parent_id', parent_id)
            .single();

        if (studentError || !student) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student does not exist or does not belong to this parent account'
            });
        }

        // Get conversation count
        const { count: conversationCount, error: convError } = await supabase
            .from('chat_conversations')
            .select('*', { count: 'exact', head: true })
            .eq('student_id', id);

        // Get recent conversations
        const { data: recentConversations, error: recentError } = await supabase
            .from('chat_conversations')
            .select('id, title, created_at, last_message_at')
            .eq('student_id', id)
            .order('last_message_at', { ascending: false })
            .limit(5);

        // Calculate days since created
        const daysSinceCreated = Math.floor(
            (new Date() - new Date(student.created_at)) / (1000 * 60 * 60 * 24)
        );

        // Calculate average messages per day
        const avgMessagesPerDay = daysSinceCreated > 0
            ? (student.total_messages / daysSinceCreated).toFixed(2)
            : 0;

        res.json({
            success: true,
            usage: {
                student_id: student.id,
                username: student.username,
                display_name: student.display_name,
                total_messages: student.total_messages || 0,
                total_conversations: conversationCount || 0,
                study_time_minutes: student.study_time_minutes || 0,
                streak_days: student.streak_days || 0,
                last_active_at: student.last_active_at,
                days_since_created: daysSinceCreated,
                avg_messages_per_day: avgMessagesPerDay,
                recent_conversations: recentConversations || []
            }
        });
    } catch (error) {
        console.error('Error in getStudentUsage:', error);
        res.status(500).json({
            error: 'Failed to fetch usage stats',
            message: 'An error occurred while fetching student usage statistics'
        });
    }
};

/**
 * Get Student Conversations
 * GET /api/students/:id/conversations
 * Requires: Parent authentication (for monitoring)
 */
export const getStudentConversations = async (req, res) => {
    try {
        const { id } = req.params;
        const parent_id = req.parent_id;

        // Verify student belongs to this parent
        const { data: existing, error: existingError } = await supabase
            .from('student_accounts')
            .select('id')
            .eq('id', id)
            .eq('parent_id', parent_id)
            .single();

        if (existingError || !existing) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student does not exist or does not belong to this parent account'
            });
        }

        // Fetch all conversations for this student
        const { data: conversations, error } = await supabase
            .from('chat_conversations')
            .select('id, title, folder, is_pinned, created_at, updated_at, last_message_at')
            .eq('student_id', id)
            .order('last_message_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.json({
            success: true,
            conversations: conversations || []
        });
    } catch (error) {
        console.error('Error in getStudentConversations:', error);
        res.status(500).json({
            error: 'Failed to fetch conversations',
            message: 'An error occurred while fetching student conversations'
        });
    }
};

/**
 * Get Student Conversation Messages
 * GET /api/students/:studentId/conversations/:conversationId/messages
 * Requires: Parent authentication (for monitoring)
 */
export const getStudentConversationMessages = async (req, res) => {
    try {
        const { studentId, conversationId } = req.params;
        const parent_id = req.parent_id;

        // Verify student belongs to this parent
        const { data: student, error: studentError } = await supabase
            .from('student_accounts')
            .select('id')
            .eq('id', studentId)
            .eq('parent_id', parent_id)
            .single();

        if (studentError || !student) {
            return res.status(404).json({
                error: 'Student not found',
                message: 'Student does not exist or does not belong to this parent account'
            });
        }

        // Verify conversation belongs to this student
        const { data: conversation, error: convError } = await supabase
            .from('chat_conversations')
            .select('id, title')
            .eq('id', conversationId)
            .eq('student_id', studentId)
            .single();

        if (convError || !conversation) {
            return res.status(404).json({
                error: 'Conversation not found',
                message: 'Conversation does not exist or does not belong to this student'
            });
        }

        // Fetch messages
        const { data: messages, error } = await supabase
            .from('chat_messages')
            .select('id, role, content, created_at, was_flagged, moderation_reason')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (error) {
            throw error;
        }

        res.json({
            success: true,
            conversation: {
                id: conversation.id,
                title: conversation.title
            },
            messages: messages || []
        });
    } catch (error) {
        console.error('Error in getStudentConversationMessages:', error);
        res.status(500).json({
            error: 'Failed to fetch messages',
            message: 'An error occurred while fetching conversation messages'
        });
    }
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
    // CRUD operations
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,

    // Password management
    resetStudentPassword,

    // Usage & Analytics
    getStudentUsage,
    getStudentConversations,
    getStudentConversationMessages
};
