-- ============================================================================
-- inspir Authentication & Account Management Schema
-- ============================================================================
-- This schema adds authentication tables and modifies existing tables
-- for backward compatibility with the session-based system
-- Run this after the base database-schema.sql
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- NEW TABLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Parent Accounts Table
-- ----------------------------------------------------------------------------
-- Core table for parent/organization accounts with OAuth support
CREATE TABLE IF NOT EXISTS parent_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Account Information
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255), -- Nullable for OAuth-only accounts

    -- Account Type
    account_type VARCHAR(50) NOT NULL DEFAULT 'parent' CHECK (account_type IN ('parent', 'school', 'organization', 'company')),

    -- Institution Details (for schools/organizations)
    institution_name VARCHAR(255),
    institution_type VARCHAR(100),
    institution_country VARCHAR(100),

    -- Verification Status
    email_verified BOOLEAN DEFAULT false,
    email_verification_token VARCHAR(255),
    email_verified_at TIMESTAMP WITH TIME ZONE,

    phone_number VARCHAR(20),
    phone_verified BOOLEAN DEFAULT false,
    phone_verification_code VARCHAR(10),
    phone_verification_expires_at TIMESTAMP WITH TIME ZONE,
    phone_verified_at TIMESTAMP WITH TIME ZONE,

    -- OAuth Integration
    google_id VARCHAR(255),
    apple_id VARCHAR(255),
    microsoft_id VARCHAR(255),
    oauth_provider VARCHAR(50), -- 'google', 'apple', 'microsoft', null for email/password

    -- Billing & Subscription
    stripe_customer_id VARCHAR(255),
    subscription_status VARCHAR(50) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'expired', 'past_due', 'canceled')),
    subscription_tier VARCHAR(50) DEFAULT 'basic',
    trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    trial_end_date TIMESTAMP WITH TIME ZONE DEFAULT (TIMEZONE('utc', NOW()) + INTERVAL '14 days'),
    subscription_start_date TIMESTAMP WITH TIME ZONE,
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    student_limit INTEGER DEFAULT 1, -- Number of students allowed (1 during trial, unlimited after activation)

    -- Security
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked BOOLEAN DEFAULT false,
    account_locked_until TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    last_login_ip VARCHAR(50),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- ----------------------------------------------------------------------------
-- Student Accounts Table
-- ----------------------------------------------------------------------------
-- Student profiles created by parents
CREATE TABLE IF NOT EXISTS student_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Parent Reference
    parent_id UUID NOT NULL REFERENCES parent_accounts(id) ON DELETE CASCADE,

    -- Authentication (username + password, NO "inspir_" prefix)
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    -- Profile Information
    display_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    birth_year INTEGER, -- For age calculation, not exact birthdate
    age_group VARCHAR(20) CHECK (age_group IN ('under14', 'teen', 'adult')), -- Calculated from birth_year

    -- Study Settings
    study_level VARCHAR(50), -- 'Year 9', 'GCSE', 'A-Level', etc.
    preferred_subjects TEXT[], -- Array of subjects

    -- Activity Tracking
    total_messages INTEGER DEFAULT 0,
    study_time_minutes INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_active_at TIMESTAMP WITH TIME ZONE,

    -- Security
    must_change_password BOOLEAN DEFAULT false,
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked BOOLEAN DEFAULT false,
    account_locked_until TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,

    -- Status
    is_active BOOLEAN DEFAULT true,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- ----------------------------------------------------------------------------
-- Team Members Table
-- ----------------------------------------------------------------------------
-- Multi-admin collaboration for organizations
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Account Reference
    parent_account_id UUID NOT NULL REFERENCES parent_accounts(id) ON DELETE CASCADE,

    -- Invitation Details
    email VARCHAR(255) NOT NULL,
    invited_by UUID REFERENCES parent_accounts(id),

    -- Role & Permissions
    role VARCHAR(50) NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    permissions JSONB DEFAULT '{"view_students": true, "manage_students": false, "view_billing": false, "manage_billing": false}'::jsonb,

    -- Status
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
    invitation_token VARCHAR(255),
    invitation_expires_at TIMESTAMP WITH TIME ZONE DEFAULT (TIMEZONE('utc', NOW()) + INTERVAL '7 days'),

    -- Timestamps
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    accepted_at TIMESTAMP WITH TIME ZONE,

    UNIQUE(parent_account_id, email)
);

-- ----------------------------------------------------------------------------
-- Password Reset Tokens Table
-- ----------------------------------------------------------------------------
-- Token-based password reset for both parents and students
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- User Reference (one of these will be set)
    parent_id UUID REFERENCES parent_accounts(id) ON DELETE CASCADE,
    student_id UUID REFERENCES student_accounts(id) ON DELETE CASCADE,

    -- Token Details
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (TIMEZONE('utc', NOW()) + INTERVAL '1 hour'),
    used BOOLEAN DEFAULT false,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),

    -- Constraint: Must reference either parent OR student, not both
    CHECK (
        (parent_id IS NOT NULL AND student_id IS NULL) OR
        (parent_id IS NULL AND student_id IS NOT NULL)
    )
);

-- ============================================================================
-- MODIFY EXISTING TABLES (Backward Compatible)
-- ============================================================================

-- Add student_id and parent_id columns to existing tables (nullable for backward compatibility)

-- Chat Conversations
ALTER TABLE chat_conversations
ADD COLUMN IF NOT EXISTS student_id UUID REFERENCES student_accounts(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES parent_accounts(id) ON DELETE CASCADE;

-- Chat Messages
ALTER TABLE chat_messages
ADD COLUMN IF NOT EXISTS student_id UUID REFERENCES student_accounts(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES parent_accounts(id) ON DELETE CASCADE;

-- Chat Folders
ALTER TABLE chat_folders
ADD COLUMN IF NOT EXISTS student_id UUID REFERENCES student_accounts(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES parent_accounts(id) ON DELETE CASCADE;

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Parent Accounts Indexes
CREATE INDEX IF NOT EXISTS idx_parent_accounts_email ON parent_accounts(email);
CREATE INDEX IF NOT EXISTS idx_parent_accounts_google_id ON parent_accounts(google_id) WHERE google_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_parent_accounts_apple_id ON parent_accounts(apple_id) WHERE apple_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_parent_accounts_microsoft_id ON parent_accounts(microsoft_id) WHERE microsoft_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_parent_accounts_stripe_customer ON parent_accounts(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_parent_accounts_subscription_status ON parent_accounts(subscription_status);

-- Student Accounts Indexes
CREATE INDEX IF NOT EXISTS idx_student_accounts_username ON student_accounts(username);
CREATE INDEX IF NOT EXISTS idx_student_accounts_parent_id ON student_accounts(parent_id);
CREATE INDEX IF NOT EXISTS idx_student_accounts_active ON student_accounts(is_active) WHERE is_active = true;

-- Team Members Indexes
CREATE INDEX IF NOT EXISTS idx_team_members_account ON team_members(parent_account_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON team_members(email);
CREATE INDEX IF NOT EXISTS idx_team_members_status ON team_members(status);

-- Password Reset Tokens Indexes
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_parent ON password_reset_tokens(parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_student ON password_reset_tokens(student_id) WHERE student_id IS NOT NULL;

-- Existing Tables - New Foreign Key Indexes
CREATE INDEX IF NOT EXISTS idx_conversations_student_id ON chat_conversations(student_id) WHERE student_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_conversations_parent_id ON chat_conversations(parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_student_id ON chat_messages(student_id) WHERE student_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_parent_id ON chat_messages(parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_folders_student_id ON chat_folders(student_id) WHERE student_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_folders_parent_id ON chat_folders(parent_id) WHERE parent_id IS NOT NULL;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE parent_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Parent Accounts Policies
-- ----------------------------------------------------------------------------

-- Parents can view their own account
CREATE POLICY "Parents can view own account" ON parent_accounts
FOR SELECT USING (
    id = current_setting('app.current_parent_id', true)::uuid
);

-- Parents can update their own account
CREATE POLICY "Parents can update own account" ON parent_accounts
FOR UPDATE USING (
    id = current_setting('app.current_parent_id', true)::uuid
);

-- Service role has full access (for backend operations)
CREATE POLICY "Service role full access to parent_accounts" ON parent_accounts
FOR ALL USING (
    current_user = 'service_role'
);

-- ----------------------------------------------------------------------------
-- Student Accounts Policies
-- ----------------------------------------------------------------------------

-- Students can view their own profile
CREATE POLICY "Students can view own profile" ON student_accounts
FOR SELECT USING (
    id = current_setting('app.current_student_id', true)::uuid
);

-- Parents can view their students
CREATE POLICY "Parents can view their students" ON student_accounts
FOR SELECT USING (
    parent_id = current_setting('app.current_parent_id', true)::uuid
);

-- Parents can insert students (up to their limit)
CREATE POLICY "Parents can create students" ON student_accounts
FOR INSERT WITH CHECK (
    parent_id = current_setting('app.current_parent_id', true)::uuid
);

-- Parents can update their students
CREATE POLICY "Parents can update their students" ON student_accounts
FOR UPDATE USING (
    parent_id = current_setting('app.current_parent_id', true)::uuid
);

-- Parents can delete their students
CREATE POLICY "Parents can delete their students" ON student_accounts
FOR DELETE USING (
    parent_id = current_setting('app.current_parent_id', true)::uuid
);

-- Service role has full access
CREATE POLICY "Service role full access to student_accounts" ON student_accounts
FOR ALL USING (
    current_user = 'service_role'
);

-- ----------------------------------------------------------------------------
-- Chat Conversations Policies (Updated for Auth)
-- ----------------------------------------------------------------------------

-- Drop existing permissive policy
DROP POLICY IF EXISTS "Allow all operations on conversations" ON chat_conversations;

-- Students can view their own conversations
CREATE POLICY "Students can view own conversations" ON chat_conversations
FOR SELECT USING (
    student_id = current_setting('app.current_student_id', true)::uuid
    OR session_id IS NOT NULL -- Backward compatibility with session-based
);

-- Students can create conversations
CREATE POLICY "Students can create conversations" ON chat_conversations
FOR INSERT WITH CHECK (
    student_id = current_setting('app.current_student_id', true)::uuid
    OR session_id IS NOT NULL -- Backward compatibility
);

-- Students can update their own conversations
CREATE POLICY "Students can update own conversations" ON chat_conversations
FOR UPDATE USING (
    student_id = current_setting('app.current_student_id', true)::uuid
    OR session_id IS NOT NULL -- Backward compatibility
);

-- Students can delete their own conversations
CREATE POLICY "Students can delete own conversations" ON chat_conversations
FOR DELETE USING (
    student_id = current_setting('app.current_student_id', true)::uuid
    OR session_id IS NOT NULL -- Backward compatibility
);

-- Parents can view their students' conversations (for monitoring)
CREATE POLICY "Parents can view student conversations" ON chat_conversations
FOR SELECT USING (
    parent_id = current_setting('app.current_parent_id', true)::uuid
);

-- Service role has full access
CREATE POLICY "Service role full access to conversations" ON chat_conversations
FOR ALL USING (
    current_user = 'service_role'
);

-- ----------------------------------------------------------------------------
-- Chat Messages Policies (Updated for Auth)
-- ----------------------------------------------------------------------------

-- Drop existing permissive policy
DROP POLICY IF EXISTS "Allow all operations on messages" ON chat_messages;

-- Students can view messages in their conversations
CREATE POLICY "Students can view own messages" ON chat_messages
FOR SELECT USING (
    student_id = current_setting('app.current_student_id', true)::uuid
    OR conversation_id IN (
        SELECT id FROM chat_conversations
        WHERE session_id IS NOT NULL -- Backward compatibility
    )
);

-- Students can create messages
CREATE POLICY "Students can create messages" ON chat_messages
FOR INSERT WITH CHECK (
    student_id = current_setting('app.current_student_id', true)::uuid
    OR conversation_id IN (
        SELECT id FROM chat_conversations
        WHERE session_id IS NOT NULL -- Backward compatibility
    )
);

-- Parents can view their students' messages
CREATE POLICY "Parents can view student messages" ON chat_messages
FOR SELECT USING (
    parent_id = current_setting('app.current_parent_id', true)::uuid
);

-- Service role has full access
CREATE POLICY "Service role full access to messages" ON chat_messages
FOR ALL USING (
    current_user = 'service_role'
);

-- ----------------------------------------------------------------------------
-- Chat Folders Policies (Updated for Auth)
-- ----------------------------------------------------------------------------

-- Drop existing permissive policy
DROP POLICY IF EXISTS "Allow all operations on folders" ON chat_folders;

-- Students can manage their own folders
CREATE POLICY "Students can manage own folders" ON chat_folders
FOR ALL USING (
    student_id = current_setting('app.current_student_id', true)::uuid
    OR session_id IS NOT NULL -- Backward compatibility
);

-- Service role has full access
CREATE POLICY "Service role full access to folders" ON chat_folders
FOR ALL USING (
    current_user = 'service_role'
);

-- ----------------------------------------------------------------------------
-- Team Members Policies
-- ----------------------------------------------------------------------------

-- Account owners and admins can view team members
CREATE POLICY "View team members" ON team_members
FOR SELECT USING (
    parent_account_id = current_setting('app.current_parent_id', true)::uuid
);

-- Service role has full access
CREATE POLICY "Service role full access to team_members" ON team_members
FOR ALL USING (
    current_user = 'service_role'
);

-- ----------------------------------------------------------------------------
-- Password Reset Tokens Policies
-- ----------------------------------------------------------------------------

-- Only service role can access password reset tokens (security)
CREATE POLICY "Service role only for password_reset_tokens" ON password_reset_tokens
FOR ALL USING (
    current_user = 'service_role'
);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Function: Update updated_at timestamp
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- Function: Increment student message count
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION increment_student_message_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Only increment for user messages (not assistant)
    IF NEW.role = 'user' AND NEW.student_id IS NOT NULL THEN
        UPDATE student_accounts
        SET total_messages = total_messages + 1,
            last_active_at = TIMEZONE('utc', NOW())
        WHERE id = NEW.student_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- Function: Calculate age group from birth year
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_age_group(birth_year INTEGER)
RETURNS VARCHAR(20) AS $$
DECLARE
    current_year INTEGER;
    age INTEGER;
BEGIN
    IF birth_year IS NULL THEN
        RETURN 'adult'; -- Default to adult if no birth year
    END IF;

    current_year := EXTRACT(YEAR FROM NOW());
    age := current_year - birth_year;

    IF age < 14 THEN
        RETURN 'under14';
    ELSIF age >= 14 AND age < 18 THEN
        RETURN 'teen';
    ELSE
        RETURN 'adult';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- Function: Validate student profile limit
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION validate_student_limit()
RETURNS TRIGGER AS $$
DECLARE
    parent_limit INTEGER;
    current_count INTEGER;
    subscription_status VARCHAR(50);
BEGIN
    -- Get parent's student limit and subscription status
    SELECT student_limit, parent_accounts.subscription_status
    INTO parent_limit, subscription_status
    FROM parent_accounts
    WHERE id = NEW.parent_id;

    -- Count current active students
    SELECT COUNT(*)
    INTO current_count
    FROM student_accounts
    WHERE parent_id = NEW.parent_id AND is_active = true;

    -- Check if subscription is expired
    IF subscription_status = 'expired' OR subscription_status = 'canceled' THEN
        RAISE EXCEPTION 'Cannot create student: Subscription expired or canceled. Please activate your subscription.';
    END IF;

    -- Check if limit exceeded
    IF current_count >= parent_limit THEN
        RAISE EXCEPTION 'Student limit reached. Current limit: %. Please upgrade your subscription.', parent_limit;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- Function: Auto-update age group on birth year change
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auto_update_age_group()
RETURNS TRIGGER AS $$
BEGIN
    NEW.age_group := calculate_age_group(NEW.birth_year);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Updated_at triggers
CREATE TRIGGER update_parent_accounts_updated_at
    BEFORE UPDATE ON parent_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_accounts_updated_at
    BEFORE UPDATE ON student_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Increment message count trigger
CREATE TRIGGER trigger_increment_student_message_count
    AFTER INSERT ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION increment_student_message_count();

-- Validate student limit trigger
CREATE TRIGGER trigger_validate_student_limit
    BEFORE INSERT ON student_accounts
    FOR EACH ROW
    EXECUTE FUNCTION validate_student_limit();

-- Auto-update age group trigger
CREATE TRIGGER trigger_auto_update_age_group
    BEFORE INSERT OR UPDATE OF birth_year ON student_accounts
    FOR EACH ROW
    EXECUTE FUNCTION auto_update_age_group();

-- ============================================================================
-- CLEANUP OLD TOKENS (Scheduled Job - Run via pg_cron or external cron)
-- ============================================================================

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
    -- Delete expired password reset tokens
    DELETE FROM password_reset_tokens
    WHERE expires_at < TIMEZONE('utc', NOW());

    -- Delete expired team invitations
    DELETE FROM team_members
    WHERE status = 'pending' AND invitation_expires_at < TIMEZONE('utc', NOW());

    -- Unlock accounts with expired lock times
    UPDATE parent_accounts
    SET account_locked = false, failed_login_attempts = 0
    WHERE account_locked = true AND account_locked_until < TIMEZONE('utc', NOW());

    UPDATE student_accounts
    SET account_locked = false, failed_login_attempts = 0
    WHERE account_locked = true AND account_locked_until < TIMEZONE('utc', NOW());
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- MIGRATION HELPER: Convert Session-Based to Demo Accounts
-- ============================================================================

-- Function to create demo accounts from existing sessions
-- This should be run manually after auth system is deployed
CREATE OR REPLACE FUNCTION migrate_sessions_to_demo()
RETURNS void AS $$
DECLARE
    demo_parent_id UUID;
    session_record RECORD;
    demo_username VARCHAR(50);
    demo_counter INTEGER := 10001;
BEGIN
    -- Create the "Demo" parent account if it doesn't exist
    INSERT INTO parent_accounts (email, password_hash, account_type, subscription_status)
    VALUES ('demo@inspir.uk', 'DISABLED', 'parent', 'active')
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO demo_parent_id;

    -- Get the demo parent ID if it already exists
    IF demo_parent_id IS NULL THEN
        SELECT id INTO demo_parent_id FROM parent_accounts WHERE email = 'demo@inspir.uk';
    END IF;

    -- Loop through unique session_ids and create student accounts
    FOR session_record IN
        SELECT DISTINCT session_id
        FROM chat_conversations
        WHERE student_id IS NULL AND session_id IS NOT NULL
    LOOP
        demo_username := 'demo_' || demo_counter;

        -- Create student account for this session
        INSERT INTO student_accounts (
            parent_id,
            username,
            password_hash,
            display_name,
            is_active
        )
        VALUES (
            demo_parent_id,
            demo_username,
            'DISABLED', -- Demo accounts can't log in
            'Demo ' || demo_counter,
            false -- Mark as inactive (read-only)
        )
        ON CONFLICT (username) DO NOTHING;

        -- Update conversations to link to this student
        UPDATE chat_conversations
        SET student_id = (SELECT id FROM student_accounts WHERE username = demo_username),
            parent_id = demo_parent_id
        WHERE session_id = session_record.session_id;

        -- Update messages
        UPDATE chat_messages
        SET student_id = (SELECT id FROM student_accounts WHERE username = demo_username),
            parent_id = demo_parent_id
        WHERE conversation_id IN (
            SELECT id FROM chat_conversations WHERE session_id = session_record.session_id
        );

        -- Update folders
        UPDATE chat_folders
        SET student_id = (SELECT id FROM student_accounts WHERE username = demo_username),
            parent_id = demo_parent_id
        WHERE session_id = session_record.session_id;

        demo_counter := demo_counter + 1;
    END LOOP;

    RAISE NOTICE 'Migration complete. Created % demo student accounts.', demo_counter - 10001;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- INITIAL DATA (Optional)
-- ============================================================================

-- Create a test parent account (for development only - remove in production)
-- INSERT INTO parent_accounts (email, password_hash, email_verified, account_type)
-- VALUES ('test@inspir.uk', '$2b$10$...', true, 'parent');

-- ============================================================================
-- END OF AUTH SCHEMA
-- ============================================================================

-- To apply this schema:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Verify all tables created: SELECT tablename FROM pg_tables WHERE schemaname = 'public';
-- 3. Test RLS policies with different user contexts
-- 4. Run migrate_sessions_to_demo() to convert existing sessions
-- 5. Set up backend with JWT authentication
