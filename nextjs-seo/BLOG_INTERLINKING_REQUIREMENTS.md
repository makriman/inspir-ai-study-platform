# Blog Interlinking Requirements

## Objective
Add internal links to ALL blog posts to improve SEO topic authority and conversion rates.

## Non-Negotiable Requirements

**Every single blog post must have:**
- ✅ At least 1 blog-to-tools link (`/tools/*`)
- ✅ At least 1 blog-to-blog link (`/blog/*`)

## Current Status

### Completed (4 posts)
1. `create-effective-study-notes-guide` - Has 1 tool link
2. `stay-motivated-studying-gets-hard-guide` - Has 2 tool links
3. `how-to-study-math-effectively-guide` - Has 1 tool link
4. `digital-flashcards-vs-paper-comparison-guide` - Has 1 tool link

**Issue:** These 4 posts have blog-to-tools links but NO blog-to-blog links yet.

### Remaining (54 posts)
All other published blog posts have NO internal links at all.

## Implementation Strategy

### 1. Fetch All Published Posts
```sql
SELECT id, slug, title, excerpt, content
FROM seo_blog_posts
WHERE status = 'published'
ORDER BY published_at DESC
```

### 2. Topic-to-Tool Mapping
Map blog post topics to relevant tools:
- Study/learning posts → `/tools/ai-planner`, `/tools/quiz-generator`
- Note-taking posts → `/tools/notes-sync`, `/tools/flashcards`
- Math posts → `/tools/math-solver`, `/tools/practice-tests`
- Motivation posts → `/tools/study-timer`, `/tools/goal-setter`
- Memory/retention posts → `/tools/flashcards`, `/tools/quiz-generator`

### 3. Topic-to-Blog Mapping
Map blog posts to related blog posts:
- Study techniques posts link to other study technique posts
- Subject-specific posts (math, science) link to each other
- Motivation posts link to productivity posts
- Tool comparison posts link to related tool guides

### 4. Insertion Strategy
**For each blog post:**
1. Analyze content to find natural insertion points
2. Add 1 contextual tool link (after relevant paragraph or in dedicated tools section)
3. Add 1 contextual blog link (inline reference or "related reading" mention)
4. Use markdown format: `[Link Text](/path/to/page)`
5. Make links feel natural, not forced

### 5. Link Placement Best Practices
- **Early placement:** Add links in first 3-5 paragraphs when possible
- **Contextual:** Link within relevant sentences/paragraphs
- **Natural language:** "Learn more about X", "Check out our guide on Y", "For more tips, see..."
- **Avoid link spam:** Don't add more than 5-7 internal links per post
- **Anchor text:** Use descriptive, keyword-rich anchor text

## Database Schema
```
Table: seo_blog_posts
- id: integer
- slug: text (unique)
- title: text
- content: text (markdown)
- excerpt: text
- status: text
- published_at: timestamp
- updated_at: timestamp
```

## Script Template

```javascript
const linkStrategies = {
  'post-slug-here': {
    toolLink: {
      after: 'Text anchor point to insert after',
      insert: ' [Tool Name](/tools/tool-slug)'
    },
    blogLink: {
      after: 'Another text anchor point',
      insert: ' (see our [related guide](/blog/related-slug))'
    }
  }
};
```

## Verification Checklist

After implementation:
- [ ] All 58 published posts have been updated
- [ ] Each post has minimum 1 tool link
- [ ] Each post has minimum 1 blog link
- [ ] Links are contextually relevant
- [ ] No broken links (verify paths exist)
- [ ] Database updated_at timestamps reflect changes
- [ ] Build completes successfully
- [ ] Links render correctly on production site

## Timeline
- **Document created:** 2025-12-26
- **Implementation:** Pending
- **Estimated effort:** 2-4 hours for all 58 posts
- **Deployment:** After verification

## Tools & Resources
- Supabase table: `seo_blog_posts`
- Script location: `/root/inspir/nextjs-seo/scripts/`
- Tool pages: 15 available at `/tools/*`
- Blog posts: 58 available at `/blog/*`

## Notes
- This is a one-time enhancement
- Future blog posts should include internal links from the start
- Monitor link performance in Search Console after deployment
- Consider A/B testing different link placements for conversion optimization
