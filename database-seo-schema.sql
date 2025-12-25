-- ============================================
-- INSPIR SEO CONTENT MANAGEMENT SCHEMA
-- ============================================
-- Run this in Supabase SQL Editor to create all SEO-related tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Authors table (for blog attribution)
CREATE TABLE IF NOT EXISTS seo_authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'Content Writer',
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Blog categories
CREATE TABLE IF NOT EXISTS seo_blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(20) DEFAULT 'blue',
    icon VARCHAR(50) DEFAULT 'folder',
    seo_title VARCHAR(60),
    seo_description VARCHAR(160),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Blog tags
CREATE TABLE IF NOT EXISTS seo_blog_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Main blog posts table
CREATE TABLE IF NOT EXISTS seo_blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    excerpt VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,  -- Markdown format
    author_id UUID REFERENCES seo_authors(id) ON DELETE SET NULL,
    category_id UUID REFERENCES seo_blog_categories(id) ON DELETE SET NULL,

    -- SEO fields
    seo_title VARCHAR(60) NOT NULL,
    seo_description VARCHAR(160) NOT NULL,
    seo_keywords TEXT[],
    canonical_url TEXT,

    -- OG & Social
    og_image_url TEXT,
    og_image_alt TEXT,
    twitter_card_type VARCHAR(20) DEFAULT 'summary_large_image',

    -- Status & visibility
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    featured BOOLEAN DEFAULT false,

    -- Analytics
    view_count INTEGER DEFAULT 0,
    avg_read_time_minutes INTEGER DEFAULT 5,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Many-to-many: posts to tags
CREATE TABLE IF NOT EXISTS seo_blog_post_tags (
    post_id UUID REFERENCES seo_blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES seo_blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Tool feature pages (15 tools)
CREATE TABLE IF NOT EXISTS seo_tool_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id VARCHAR(50) NOT NULL UNIQUE,  -- 'quiz', 'flashcards', etc.
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,

    -- Features list (JSONB array)
    features JSONB DEFAULT '[]',
    use_cases JSONB DEFAULT '[]',
    how_it_works TEXT,

    -- SEO
    seo_title VARCHAR(60) NOT NULL,
    seo_description VARCHAR(160) NOT NULL,
    seo_keywords TEXT[],
    og_image_url TEXT,

    -- Demo content
    demo_embed_url TEXT,
    video_url TEXT,
    screenshots JSONB DEFAULT '[]',

    -- Popularity metrics
    view_count INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0.0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Static pages (Terms, Privacy, About)
CREATE TABLE IF NOT EXISTS seo_static_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    seo_title VARCHAR(60),
    seo_description VARCHAR(160),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- SEO metadata overrides (for any custom page)
CREATE TABLE IF NOT EXISTS seo_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path VARCHAR(255) NOT NULL UNIQUE,  -- e.g., '/', '/pricing'
    title VARCHAR(60) NOT NULL,
    description VARCHAR(160) NOT NULL,
    keywords TEXT[],
    og_image_url TEXT,
    canonical_url TEXT,
    robots_directive VARCHAR(50) DEFAULT 'index, follow',
    structured_data JSONB,  -- JSON-LD schema
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Redirects (for URL management)
CREATE TABLE IF NOT EXISTS seo_redirects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_path VARCHAR(255) NOT NULL UNIQUE,
    to_path VARCHAR(255) NOT NULL,
    redirect_type INTEGER DEFAULT 301,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON seo_blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON seo_blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON seo_blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON seo_blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON seo_blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON seo_blog_posts(author_id);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON seo_blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON seo_blog_tags(slug);

CREATE INDEX IF NOT EXISTS idx_tool_pages_slug ON seo_tool_pages(slug);
CREATE INDEX IF NOT EXISTS idx_tool_pages_tool_id ON seo_tool_pages(tool_id);

CREATE INDEX IF NOT EXISTS idx_static_pages_slug ON seo_static_pages(slug);
CREATE INDEX IF NOT EXISTS idx_metadata_path ON seo_metadata(path);

-- Full-text search on blog content
CREATE INDEX IF NOT EXISTS idx_blog_posts_search ON seo_blog_posts
    USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || content));

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS trigger_blog_posts_updated_at
    BEFORE UPDATE ON seo_blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS trigger_tool_pages_updated_at
    BEFORE UPDATE ON seo_tool_pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS trigger_metadata_updated_at
    BEFORE UPDATE ON seo_metadata
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS POLICIES (Permissive for public access)
-- ============================================

ALTER TABLE seo_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_tool_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_static_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_redirects ENABLE ROW LEVEL SECURITY;

-- Read access for everyone (public blog)
CREATE POLICY IF NOT EXISTS "Public read access to published posts"
    ON seo_blog_posts FOR SELECT
    USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Public read access to all metadata"
    ON seo_metadata FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Public read access to authors"
    ON seo_authors FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Public read access to categories"
    ON seo_blog_categories FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Public read access to tags"
    ON seo_blog_tags FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Public read access to post tags"
    ON seo_blog_post_tags FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Public read access to tool pages"
    ON seo_tool_pages FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Public read access to static pages"
    ON seo_static_pages FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Public read access to redirects"
    ON seo_redirects FOR SELECT
    USING (true);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert 3 authors
INSERT INTO seo_authors (name, bio, role, avatar_url, social_links)
VALUES
  ('Dr. Sarah Chen', 'Educational psychologist specializing in study techniques and learning science. PhD from Cambridge University.', 'AI Education Expert', '/assets/authors/sarah-chen.jpg', '{"twitter": "@sarahchen", "linkedin": "sarah-chen"}'),
  ('James Wright', 'Former teacher turned EdTech writer. Passionate about making learning accessible through technology.', 'Study Skills Coach', '/assets/authors/james-wright.jpg', '{"twitter": "@jameswright", "linkedin": "james-wright"}'),
  ('Emily Parker', 'Tech writer and student productivity specialist. Helps students leverage AI for better learning outcomes.', 'Content Writer', '/assets/authors/emily-parker.jpg', '{"twitter": "@emilyparker", "linkedin": "emily-parker"}')
ON CONFLICT DO NOTHING;

-- Insert 12 categories
INSERT INTO seo_blog_categories (name, slug, description, color, icon, seo_title, seo_description)
VALUES
  ('Study Skills & Techniques', 'study-skills', 'Evidence-based study methods and learning techniques', 'blue', 'book-open', 'Study Skills & Techniques | inspir Blog', 'Master effective study skills with science-backed techniques and strategies for better learning.'),
  ('Tool Guides & Tutorials', 'tool-guides', 'How-to guides for inspir study tools', 'purple', 'wrench', 'Tool Guides & Tutorials | inspir Blog', 'Learn how to use AI-powered study tools effectively with step-by-step tutorials.'),
  ('Subject-Specific Help', 'subject-help', 'Tips and strategies for specific subjects', 'green', 'graduation-cap', 'Subject-Specific Study Help | inspir Blog', 'Get targeted study advice for math, science, history, and more subjects.'),
  ('Exam Prep & Test-Taking', 'exam-prep', 'Exam preparation and test-taking strategies', 'red', 'clipboard-check', 'Exam Prep & Test-Taking Tips | inspir Blog', 'Ace your exams with proven test preparation strategies and stress management techniques.'),
  ('Productivity & Motivation', 'productivity', 'Stay motivated and productive in your studies', 'yellow', 'zap', 'Productivity & Motivation for Students | inspir Blog', 'Boost your study productivity and maintain motivation with practical tips and mindset strategies.'),
  ('AI & Technology in Education', 'ai-education', 'How AI is transforming learning', 'indigo', 'cpu', 'AI & Technology in Education | inspir Blog', 'Explore how artificial intelligence is revolutionizing education and enhancing student learning.'),
  ('Time Management', 'time-management', 'Manage your study time effectively', 'orange', 'clock', 'Time Management for Students | inspir Blog', 'Master time management skills to balance studying, work, and life effectively.'),
  ('Note-Taking', 'note-taking', 'Effective note-taking methods', 'cyan', 'pencil', 'Note-Taking Methods & Strategies | inspir Blog', 'Discover effective note-taking methods that improve comprehension and retention.'),
  ('Memory & Retention', 'memory', 'Techniques to improve memory and retention', 'pink', 'brain', 'Memory & Retention Techniques | inspir Blog', 'Learn scientifically-proven memory techniques to retain information longer and recall it faster.'),
  ('Learning Science', 'learning-science', 'The science behind effective learning', 'teal', 'flask', 'Learning Science & Research | inspir Blog', 'Understand the neuroscience and psychology behind how we learn most effectively.'),
  ('Student Wellbeing', 'student-wellbeing', 'Mental health and wellbeing for students', 'emerald', 'heart', 'Student Wellbeing & Mental Health | inspir Blog', 'Prioritize your mental health and wellbeing while achieving academic success.'),
  ('Career & Future Planning', 'career-planning', 'Planning your academic and career future', 'violet', 'briefcase', 'Career & Future Planning for Students | inspir Blog', 'Plan your academic journey and future career with strategic guidance and resources.')
ON CONFLICT DO NOTHING;

-- Insert 30 tags
INSERT INTO seo_blog_tags (name, slug)
VALUES
  ('Active Recall', 'active-recall'),
  ('Spaced Repetition', 'spaced-repetition'),
  ('Pomodoro Technique', 'pomodoro-technique'),
  ('Flashcards', 'flashcards'),
  ('Quiz Generator', 'quiz-generator'),
  ('Study Timer', 'study-timer'),
  ('Math Help', 'math-help'),
  ('Science Study', 'science-study'),
  ('Essay Writing', 'essay-writing'),
  ('Exam Preparation', 'exam-preparation'),
  ('Test Anxiety', 'test-anxiety'),
  ('Focus & Concentration', 'focus-concentration'),
  ('Productivity Hacks', 'productivity-hacks'),
  ('Study Schedule', 'study-schedule'),
  ('Cornell Notes', 'cornell-notes'),
  ('Mind Mapping', 'mind-mapping'),
  ('Visual Learning', 'visual-learning'),
  ('Study Music', 'study-music'),
  ('Habit Tracking', 'habit-tracking'),
  ('Goal Setting', 'goal-setting'),
  ('AI Tutor', 'ai-tutor'),
  ('Online Learning', 'online-learning'),
  ('Homework Help', 'homework-help'),
  ('Memory Techniques', 'memory-techniques'),
  ('Study Motivation', 'study-motivation'),
  ('Time Management', 'time-management'),
  ('Learning Strategies', 'learning-strategies'),
  ('Academic Success', 'academic-success'),
  ('Student Tips', 'student-tips'),
  ('Digital Tools', 'digital-tools')
ON CONFLICT DO NOTHING;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE 'SEO schema created successfully!';
    RAISE NOTICE 'Tables: 9 tables created';
    RAISE NOTICE 'Indexes: 13 indexes created';
    RAISE NOTICE 'Triggers: 3 triggers created';
    RAISE NOTICE 'RLS Policies: 9 policies created';
    RAISE NOTICE 'Seed Data: 3 authors, 12 categories, 30 tags inserted';
END $$;
