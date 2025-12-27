# inspir Database Population Scripts

This directory contains Node.js scripts to populate and enhance database content for the inspir SEO platform.

## Scripts Overview

### 1. `populate-blog-metadata.js`
Populates missing metadata fields for existing blog posts:
- **seo_keywords**: Extracted from title, content, and category
- **canonical_url**: Generated from post slug
- **og_image_alt**: Generated from title
- **avg_read_time_minutes**: Calculated from word count (225 words/min)

### 2. `populate-tool-metadata.js`
Populates missing metadata for tool pages:
- **seo_keywords**: Tool-specific keyword arrays
- **og_image_url**: Paths to tool OG images (images need to be created separately)
- **screenshots**: Placeholder screenshot paths

### 3. `generate-missing-blog-posts.js`
Creates draft templates for the 14 high-priority missing blog posts:
- Creates posts with complete SEO metadata
- Generates structured content outlines
- Sets status to 'draft' for manual completion
- Includes internal links to tools

## Setup

1. **Install dependencies:**
```bash
cd /root/inspir/scripts
npm install
```

2. **Environment variables:**
Scripts use environment variables from `/root/inspir/backend/.env`:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Ensure these are set correctly before running.

## Usage

### Run Individual Scripts

```bash
# Populate blog metadata
npm run populate:blog

# Populate tool metadata
npm run populate:tools

# Generate missing blog post templates
npm run generate:missing-posts

# Run all population scripts
npm run populate:all
```

### Run Scripts Directly

```bash
node populate-blog-metadata.js
node populate-tool-metadata.js
node generate-missing-blog-posts.js
```

## What Each Script Does

### populate-blog-metadata.js

**Before:**
```sql
SELECT title, seo_keywords, canonical_url, og_image_alt, avg_read_time_minutes
FROM seo_blog_posts WHERE id = 'example';

-- Result:
-- title: "How AI is Transforming Education"
-- seo_keywords: NULL
-- canonical_url: NULL
-- og_image_alt: NULL
-- avg_read_time_minutes: 0
```

**After:**
```sql
-- Result:
-- title: "How AI is Transforming Education"
-- seo_keywords: ["ai", "education", "transforming", "learning", "students"]
-- canonical_url: "https://inspir.uk/blog/how-ai-is-transforming-education"
-- og_image_alt: "How AI is Transforming Education - inspir Blog Post Cover Image"
-- avg_read_time_minutes: 7
```

### populate-tool-metadata.js

**Before:**
```sql
SELECT title, seo_keywords, og_image_url FROM seo_tool_pages WHERE slug = 'quiz-generator';

-- Result:
-- title: "AI Quiz Generator"
-- seo_keywords: NULL
-- og_image_url: NULL
```

**After:**
```sql
-- Result:
-- title: "AI Quiz Generator"
-- seo_keywords: ["quiz generator", "create quizzes", "test maker", "quiz builder", "ai quiz"]
-- og_image_url: "/assets/tools/og/quiz-generator-og.png"
```

### generate-missing-blog-posts.js

Creates 14 new draft blog posts based on `TOP_12_PRIORITY_POSTS.md`:

1. Active Recall Study Technique Guide
2. Create Effective Study Notes Guide
3. SAT Study Guide Complete Preparation Timeline
4. GCSE Revision Strategies Month-by-Month Plan
5. How to Use Quiz Generator Test Prep
6. Digital Flashcards vs Paper Comparison Guide
7. Stay Motivated Studying Gets Hard Guide
8. How to Study Math Effectively Guide
9. Spaced Repetition Memory Retention Guide
10. Sleep Study Memory Consolidation Science
11. Test Anxiety Strategies Stay Calm Exams
12. AI Math Solver Step-by-Step Solutions
13. Time Management Students Balancing Study Work Life
14. Growth Mindset Students Academic Success

Each post includes:
- Complete SEO metadata (title, description, keywords)
- Structured content outline with sections
- Internal links to relevant tools
- Status: `draft` (ready for content writing)
- Calculated read time

## Output Examples

### populate-blog-metadata.js
```
🚀 Starting blog metadata population...

📊 Found 44 published posts

✅ Updated: How AI is Transforming Education
   Keywords: ai, education, transforming, learning, students...
   Read time: 7 min
✅ Updated: Complete Guide to Spaced Repetition
   Keywords: spaced, repetition, memory, learning, retention...
   Read time: 8 min
⏭️  Skipped (already complete): Study Techniques for Visual Learners

✨ Metadata population complete!
📈 Updated 23 out of 44 posts
```

### generate-missing-blog-posts.js
```
🚀 Starting blog post template generation...

📝 Generating 14 missing blog post templates

✅ Created: The Ultimate Guide to Active Recall: Science-Backed Study Technique
   Category: Study Skills & Techniques
   Read time: 8 min
   Status: draft
✅ Created: How to Create Effective Study Notes That Actually Work
   Category: Note-Taking
   Read time: 7 min
   Status: draft
...

✨ Blog post generation complete!
📈 Created 14 new draft posts

📝 Next steps:
   1. Review each draft post in Supabase dashboard
   2. Fill in the content sections with detailed writing
   3. Add featured images (1200x630px) to public/assets/blog/
   4. Set status to 'published' when ready
```

## Post-Script Actions

### After Running populate-tool-metadata.js

You'll need to create actual images:

1. **OG Images** (1200x630px):
   - Location: `/root/inspir/nextjs-seo/public/assets/tools/og/`
   - Naming: `{tool-slug}-og.png`
   - Content: Tool name, icon, short description, inspir branding

2. **Screenshots** (1280x720px+):
   - Location: `/root/inspir/nextjs-seo/public/assets/tools/screenshots/`
   - Naming: `{tool-slug}-1.png`, `{tool-slug}-2.png`
   - Content: Actual tool interface screenshots

### After Running generate-missing-blog-posts.js

1. **Review drafts in Supabase:**
   ```sql
   SELECT id, title, status, slug FROM seo_blog_posts WHERE status = 'draft';
   ```

2. **Write content for each section:**
   - Fill in the `[Content to be written...]` placeholders
   - Add research, statistics, examples
   - Include actionable tips

3. **Create featured images:**
   - Size: 1200x630px
   - Location: `/root/inspir/nextjs-seo/public/assets/blog/`
   - Naming: `{slug}.jpg` or `{slug}.png`

4. **Publish:**
   ```sql
   UPDATE seo_blog_posts
   SET status = 'published',
       published_at = NOW(),
       featured_image = '/assets/blog/{slug}.jpg'
   WHERE slug = 'active-recall-study-technique-guide';
   ```

## Troubleshooting

### "Module not found: @supabase/supabase-js"
```bash
cd /root/inspir/scripts
npm install
```

### "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### "Invalid Supabase credentials"
Check that `/root/inspir/backend/.env` contains:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### "Permission denied" errors
Ensure the service role key has full access to tables. Check RLS policies in Supabase.

## Safety Features

- **No deletions**: Scripts only INSERT or UPDATE, never DELETE
- **Existing data preserved**: Scripts check for existing values before updating
- **Draft status**: Generated posts are 'draft' by default, not published
- **Dry-run logs**: All scripts log actions before executing

## Contributing

When adding new scripts:
1. Follow the existing naming pattern
2. Add comprehensive logging
3. Include error handling
4. Document in this README
5. Add to `package.json` scripts section

---

**Last Updated:** December 26, 2025
**Author:** Claude Code
**Part of:** inspir SEO Powerhouse Implementation
