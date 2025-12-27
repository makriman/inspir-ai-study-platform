const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const fs = require('fs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Read the blog post markdown files
const satGuide = fs.readFileSync('/tmp/sat-study-guide.md', 'utf8');
const activeRecall = fs.readFileSync('/tmp/active-recall-guide.md', 'utf8');

// Extract content (remove metadata lines)
const extractContent = (md) => {
  const lines = md.split('\n');
  const contentStart = lines.findIndex(line => line.startsWith('## Introduction'));
  return lines.slice(contentStart).join('\n');
};

const satContent = extractContent(satGuide);
const activeRecallContent = extractContent(activeRecall);

const posts = [
  {
    title: 'SAT Study Guide: Complete Preparation Timeline',
    slug: 'sat-study-guide-complete-preparation-timeline',
    excerpt: 'Complete SAT preparation roadmap with 12-week study plan, section-by-section strategies, practice test schedule, and proven techniques to achieve 1400+ scores.',
    content: satContent,
    author_id: '960b15f0-dc64-467e-901a-dd6574c5c7bb', // Dr Sarah Mitchell
    category_id: '3e3e9277-f86e-4ced-be1d-116f5f7c2668', // Exam Prep & Test-Taking
    seo_title: 'SAT Study Guide: 12-Week Preparation Timeline & Strategies',
    seo_description: 'Complete SAT preparation roadmap: 12-week study plan, section strategies, practice test schedule, and proven techniques for 1400+ scores.',
    seo_keywords: 'SAT study guide, SAT preparation, how to study for SAT, SAT test prep, SAT study plan',
    canonical_url: 'https://inspir.uk/blog/sat-study-guide-complete-preparation-timeline',
    twitter_card_type: 'summary_large_image',
    status: 'published',
    published_at: new Date().toISOString(),
    featured: true,
    view_count: 0,
    avg_read_time_minutes: 10
  },
  {
    title: 'The Ultimate Guide to Active Recall: Science-Backed Study Technique',
    slug: 'active-recall-study-technique-guide',
    excerpt: 'Learn how active recall works, why it\'s proven effective by neuroscience, and how to apply it to every subject. Research-backed strategies for 2-3x better memory retention.',
    content: activeRecallContent,
    author_id: '960b15f0-dc64-467e-901a-dd6574c5c7bb', // Dr Sarah Mitchell
    category_id: '99aa1cbf-709e-4e94-aa85-afe4baebe721', // Study Skills & Techniques
    seo_title: 'Active Recall Technique: The Science Behind Effective Learning',
    seo_description: 'Learn how active recall works, why it\'s proven effective, and how to apply it to every subject. Research-backed strategies for better memory retention.',
    seo_keywords: 'active recall, active recall study technique, how to use active recall, study techniques, memory retention',
    canonical_url: 'https://inspir.uk/blog/active-recall-study-technique-guide',
    twitter_card_type: 'summary_large_image',
    status: 'published',
    published_at: new Date().toISOString(),
    featured: true,
    view_count: 0,
    avg_read_time_minutes: 11
  }
];

(async () => {
  for (const post of posts) {
    const { data, error } = await supabase
      .from('seo_blog_posts')
      .insert([post])
      .select();

    if (error) {
      console.error(`Error inserting "${post.title}":`, error);
    } else {
      console.log(`✅ Successfully inserted: "${post.title}"`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   URL: https://inspir.uk/blog/${post.slug}\n`);
    }
  }
})();
